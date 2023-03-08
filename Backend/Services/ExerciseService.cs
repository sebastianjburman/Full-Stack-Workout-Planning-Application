using Backend.Exceptions;
using Backend.Interfaces;
using Backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ExerciseService : IExerciseService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<Exercise> _exercises;
    private readonly IMongoCollection<User> _users;

    public ExerciseService(IExerciseStoreDatabaseSettings settings, IMongoClient client)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _exercises = _database.GetCollection<Exercise>("exercises");
        _users = _database.GetCollection<User>("users");
    }

    public async Task<Exercise> GetExerciseByIdAsync(string id, string userId)
    {
        Exercise exercise = await _exercises.Find(e => e.Id == id).FirstOrDefaultAsync();
        if (exercise.CreatedBy != userId)
        {
            throw new InvalidAccessException("view");
        }
        return exercise;
    }
    public async Task<List<Exercise>> GetAllRecentlyCreatedExercisesByDate(int limit)
    {
        SortDefinition<Exercise> sort = Builders<Exercise>.Sort.Descending("_createdAt");
        List<Exercise> exercises = await _exercises.FindAsync(Builders<Exercise>.Filter.Empty, new FindOptions<Exercise>
        {
            Limit = limit,
            Sort = sort
        }).Result.ToListAsync();
        return exercises;
    }

    public async Task<List<Exercise>> GetAllExerciseCreatedAsync(string userId)
    {
        List<Exercise> exercises = await _exercises.FindAsync(e => e.CreatedBy == userId).Result.ToListAsync();
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
        Exercise exercise = await _exercises.Find(e => e.Id == exerciseId).FirstOrDefaultAsync();
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
    public async Task<List<User>> GetTopUsersByExerciseCountAsync(int limit)
    {
        var userGroups = await _exercises.Aggregate()
            .Group(exercise => exercise.CreatedBy, 
                   group => new { 
                       UserId = group.Key, 
                       ExerciseCount = group.Count() 
                   })
            .SortByDescending(group => group.ExerciseCount)
            .Limit(limit)
            .ToListAsync();

        var userIds = userGroups.Select(group => group.UserId);

        var users = await _users.Find(user => userIds.Contains(user.Id)).ToListAsync();

        return users;
    }
}
