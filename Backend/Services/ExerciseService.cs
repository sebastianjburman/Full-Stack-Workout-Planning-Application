using Backend.Exceptions;
using Backend.Interfaces;
using Backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

public class ExerciseService : IExerciseService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<Exercise> _exercises;
    private readonly IMongoCollection<User> _users;

    public ExerciseService(IServiceDatabaseSettings settings, IMongoClient client)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _exercises = _database.GetCollection<Exercise>("exercises");
        _users = _database.GetCollection<User>("users");

        // Create unique indexes
        var exerciseNameKey = Builders<Exercise>.IndexKeys.Ascending(x => x.Name);
        var uniqueIndexOption = new CreateIndexOptions { Unique = true };
        var exerciseNameIndexModel = new CreateIndexModel<Exercise>(exerciseNameKey, uniqueIndexOption);
        _exercises.Indexes.CreateOne(exerciseNameIndexModel);
    }

    public async Task<ExerciseViewModel> GetExerciseByIdAsync(string id)
    {
        var pipeline = new BsonDocument[]
        {
            new BsonDocument("$match", new BsonDocument("_id", new ObjectId(id))),
            new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "users" },
                { "localField","created_by" },
                { "foreignField", "_id" },
                { "as", "createdUser" }
            }
            ),
            new BsonDocument("$unwind", "$createdUser"),
            new BsonDocument("$project",
            new BsonDocument
            {
                { "Name", "$name" },
                { "Description", "$description" },
                { "Sets", "$sets" },
                { "Reps", "$reps" },
                { "CreatedByUsername", "$createdUser.profile.username" },
                { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
            }
            ),
            new BsonDocument("$limit", 1)
        };
         return await _exercises.AggregateAsync<ExerciseViewModel>(pipeline).Result.FirstOrDefaultAsync();
    }

    public async Task<List<ExerciseViewModel>> GetAllRecentlyCreatedExercisesByDate(int limit)
    {
        var pipeline = new BsonDocument[]
        {
            new BsonDocument("$sort", new BsonDocument("createdAt", -1)),
            new BsonDocument("$limit", limit),
            new BsonDocument("$lookup",
                new BsonDocument
                {
                    { "from", "users" },
                    { "localField", "created_by" },
                    { "foreignField", "_id" },
                    { "as", "createdUser" }
                }
            ),
            new BsonDocument("$unwind", "$createdUser"),
            new BsonDocument("$project",
                new BsonDocument
                {
                    { "Name", "$name" },
                    { "Description", "$description" },
                    { "Sets", "$sets" },
                    { "Reps", "$reps" },
                    { "CreatedByUsername", "$createdUser.profile.username" },
                    { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                }
            ),
        };
        return await _exercises.AggregateAsync<ExerciseViewModel>(pipeline).Result.ToListAsync();
    }

    public async Task<List<ExerciseViewModel>> GetAllExerciseCreatedAsync(string userId)
    {
        var pipeline = new BsonDocument[]
        {
            new BsonDocument("$match", new BsonDocument("created_by", new ObjectId(userId))),
            new BsonDocument("$sort", new BsonDocument("createdAt", -1)),
            new BsonDocument("$lookup",
                new BsonDocument
                {
                    { "from", "users" },
                    { "localField", "created_by" },
                    { "foreignField", "_id" },
                    { "as", "createdUser" }
                }
            ),
            new BsonDocument("$unwind", "$createdUser"),
            new BsonDocument("$project",
                new BsonDocument
                {
                    { "Name", "$name" },
                    { "Description", "$description" },
                    { "Sets", "$sets" },
                    { "Reps", "$reps" },
                    { "CreatedByUsername", "$createdUser.profile.username" },
                    { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                }
            ),
        };
        return await _exercises.AggregateAsync<ExerciseViewModel>(pipeline).Result.ToListAsync();
    }

    public async Task<List<Exercise>> GetAllExerciseCreatedSearchAsync(string userId, string search)
    {
        var filterBuilder = Builders<Exercise>.Filter;
        var filter = filterBuilder.And(filterBuilder.Eq("created_by", new ObjectId(userId)), filterBuilder.Regex("name", new BsonRegularExpression(search, "i")));
        List<Exercise> exercises = await _exercises.FindAsync(filter).Result.ToListAsync();
        return exercises;
    }

    public async Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy)
    {
        //Make exercise id null so that mongo will generate a new one.
        exercise.Id = null;
        //Set the exercise's created by to the user who created the
        exercise.CreatedBy = createdBy;
        exercise.CreatedAt = System.DateTime.Now;
        await _exercises.InsertOneAsync(exercise);
        return exercise;
    }

    public async Task UpdateExerciseAsync(string exerciseId, string userId, Exercise exerciseIn)
    {
        //Make sure the user doesn't change the exercise's created by
        Exercise exercise = await _exercises.FindAsync(e => e.Id == exerciseId).Result.FirstOrDefaultAsync();
        if (exerciseIn.CreatedBy != exercise.CreatedBy)
        {
            throw new Exception("You cannot change the exercise's created by.");
        }
        if (exercise.CreatedBy != userId)
        {
            throw new InvalidAccessException("update");
        }
        await _exercises.ReplaceOneAsync(e => e.Id == exerciseId, exerciseIn);
    }
    public async Task DeleteExerciseAsync(string exerciseId, string userId)
    {
        Exercise exercise = await _exercises.FindAsync(e => e.Id == exerciseId).Result.FirstOrDefaultAsync();
        //The user can't delete the exercise if they didn't create it
        if (exercise.CreatedBy != userId)
        {
            throw new InvalidAccessException("delete");
        }
        await _exercises.DeleteOneAsync(e => e.Id == exercise.Id);
    }
    public async Task<List<User>> GetTopUsersByExerciseCountAsync(int limit)
    {
        var userGroups = await _exercises.Aggregate()
            .Group(exercise => exercise.CreatedBy,
                   group => new
                   {
                       UserId = group.Key,
                       ExerciseCount = group.Count()
                   })
            .SortByDescending(group => group.ExerciseCount)
            .Limit(limit)
            .ToListAsync();

        var userIds = userGroups.Select(group => group.UserId);

        var users = await _users.FindAsync(user => userIds.Contains(user.Id)).Result.ToListAsync();

        return users;
    }
    
    public async Task<List<Exercise>> SearchExercisesAsync(string search)
    {
        var filterBuilder = Builders<Exercise>.Filter;
        var filter = filterBuilder.Regex("name", new BsonRegularExpression(search, "i"));
        List<Exercise> exercises = await _exercises.FindAsync(filter).Result.ToListAsync();
        return exercises; 
    }
}
