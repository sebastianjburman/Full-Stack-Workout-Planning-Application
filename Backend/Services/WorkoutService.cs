using Backend.Exceptions;
using Backend.Interfaces;
using Backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

public class WorkoutService : IWorkoutService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<Workout> _workouts;
    private readonly IMongoCollection<Exercise> _exercises;
    private readonly IExerciseService _exerciseService;
    private readonly IWorkoutLikeService _workoutLikeService;

    public WorkoutService(IServiceDatabaseSettings settings, IMongoClient client, IExerciseService exerciseService, IWorkoutLikeService workoutLikeService)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _workouts = _database.GetCollection<Workout>("workouts");
        _exerciseService = exerciseService;
        _exercises = _database.GetCollection<Exercise>("exercises");
        _workoutLikeService = workoutLikeService;

        // Create unique indexes
        var workoutNameKey = Builders<Workout>.IndexKeys.Ascending(x => x.WorkoutName);
        var uniqueIndexOption = new CreateIndexOptions { Unique = true };
        var workoutNameIndexModel = new CreateIndexModel<Workout>(workoutNameKey, uniqueIndexOption);
        _workouts.Indexes.CreateOne(workoutNameIndexModel);
    }

    public async Task<WorkoutViewModel> GetWorkoutByIdAsync(string id, string userId)
    {
        var pipeline = new BsonDocument[]
        {
        new BsonDocument("$match", new BsonDocument("_id", new ObjectId(id))),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "users" },
                { "localField", "createdBy" },
                { "foreignField", "_id" },
                { "as", "createdUser" }
            }
        ),
        new BsonDocument("$unwind", "$createdUser"),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "WorkoutLikes" },
                { "let", new BsonDocument("workoutId", "$_id") },
                { "pipeline", new BsonArray
                    {
                        new BsonDocument("$match",
                            new BsonDocument("$expr",
                                new BsonDocument("$and",
                                    new BsonArray
                                    {
                                        //Checking if workoutId from WorkoutLikes collection is equal to workoutId from workouts collection
                                        new BsonDocument("$eq", new BsonArray { "$workoutId", "$$workoutId" }),
                                        //Checking if userId from WorkoutLikes collection is equal to userId from users collection
                                        new BsonDocument("$eq", new BsonArray { "$userId", new ObjectId(userId) })
                                    }
                                )
                            )
                        )
                    }
                },
                { "as", "userLike" }
            }
        ),
        new BsonDocument("$project",
            new BsonDocument
            {
                { "WorkoutName", "$workoutName" },
                { "WorkoutDescription", "$workoutDescription" },
                { "Exercises", "$exercises" },
                { "IsPublic", "$isPublic"},
                { "CreatedAt", "$createdAt" },
                { "CreatedBy", "$createdBy"},
                { "CreatedByUsername", "$createdUser.profile.username" },
                { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                { "UserLiked", new BsonDocument("$cond",
                    // Check if there are any objects in the userLike array if so then return true else return false
                    new BsonArray
                    {
                        new BsonDocument("$gt", new BsonArray { new BsonDocument("$size", "$userLike"), 0 }),
                        true,
                        false
                    }
                )}
            }
        ),
        };

        var result = await _workouts.Aggregate<WorkoutViewModel>(pipeline).FirstOrDefaultAsync();

        if (result == null)
        {
            throw new NotFoundException("Workout");
        }
        if (!result.IsPublic && result.CreatedBy != userId)
        {
            throw new InvalidAccessException("view");
        }
        return result;
    }

    public async Task<Workout> CreateWorkoutAsync(Workout workout, string createdBy)
    {
        if (workout.Exercises.Count >= 15 || workout.Exercises.Count == 0)
        {
            throw new Exception("Cannot have 0 exercises or more than 15 exercises to workout.");
        }
        //Check that all exercises exist in the workout
        for (int i = 0; i < workout.Exercises.Count; i++)
        {
            string exerciseId = workout.Exercises.ElementAt(i);
            var exercise = await _exercises.FindAsync(e => e.Id == exerciseId).Result.FirstOrDefaultAsync();
            if (exercise == null)
            {
                throw new Exception($"Exercise {exerciseId} in this workout does not exist");
            }
        }
        //Make workout id null so that mongo will generate a new one.
        workout.Id = null;
        //Set the workouts's created by to the user who created the
        workout.CreatedBy = createdBy;
        //Set created date to now
        workout.CreatedAt = DateTime.Now;
        await _workouts.InsertOneAsync(workout);
        return workout;
    }

    public async Task UpdateWorkoutAsync(string workoutId, string userId, Workout workoutIn)
    {
        Workout workout = await _workouts.Find(e => e.Id == workoutId).FirstOrDefaultAsync();
        //Check if users changed the created by field
        if (workoutIn.CreatedBy != workout.CreatedBy)
        {
            throw new Exception("You cannot change the workouts's created by.");
        }
        //Check if user is trying to update workouts created at time
        if (workoutIn.CreatedAt != workout.CreatedAt)
        {
            throw new Exception("You cannot change the workouts's created at.");
        }
        //Check if the user created this workout
        if (workout.CreatedBy != userId)
        {
            throw new InvalidAccessException("update");
        }
        if (workoutIn.Exercises.Count >= 15)
        {
            throw new Exception("Cannot have more that 15 exercises in a workout");
        }
        await _workouts.ReplaceOneAsync(e => e.Id == workoutId, workoutIn);
    }

    public async Task DeleteWorkoutAsync(string workoutId, string userId)
    {
        //Make sure the user doesn't change the workouts's created by
        Workout workout = await _workouts.Find(e => e.Id == workoutId).FirstOrDefaultAsync();
        //Check if the user created this workout
        if (workout.CreatedBy != userId)
        {
            throw new InvalidAccessException("delete");
        }
        await _workouts.DeleteOneAsync(e => e.Id == workoutId);
        await _workoutLikeService.DeleteAllLikesByWorkoutIdAsync(workoutId);
    }

    public async Task<List<WorkoutViewModel>> GetAllWorkoutsCreatedAsync(string userId)
    {
        var pipeline = new BsonDocument[]
        {
        new BsonDocument("$match", new BsonDocument("createdBy", new ObjectId(userId))),
        new BsonDocument("$sort", new BsonDocument("createdAt", -1)),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "users" },
                { "localField", "createdBy" },
                { "foreignField", "_id" },
                { "as", "createdUser" }
            }
        ),
        new BsonDocument("$unwind", "$createdUser"),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "WorkoutLikes" },
                { "let", new BsonDocument("workoutId", "$_id") },
                { "pipeline", new BsonArray
                    {
                        new BsonDocument("$match",
                            new BsonDocument("$expr",
                                new BsonDocument("$and",
                                    new BsonArray
                                    {
                                        //Checking if workoutId from WorkoutLikes collection is equal to workoutId from workouts collection
                                        new BsonDocument("$eq", new BsonArray { "$workoutId", "$$workoutId" }),
                                        //Checking if userId from WorkoutLikes collection is equal to userId from users collection
                                        new BsonDocument("$eq", new BsonArray { "$userId", new ObjectId(userId) })
                                    }
                                )
                            )
                        )
                    }
                },
                { "as", "userLike" }
            }
        ),
        new BsonDocument("$project",
            new BsonDocument
            {
                { "WorkoutName", "$workoutName" },
                { "WorkoutDescription", "$workoutDescription" },
                { "Exercises", "$exercises" },
                { "IsPublic", "$isPublic"},
                { "CreatedAt", "$createdAt" },
                { "CreatedByUsername", "$createdUser.profile.username" },
                { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                { "UserLiked", new BsonDocument("$cond",
                    // Check if there are any objects in the userLike array if so then return true else return false
                    new BsonArray
                    {
                        new BsonDocument("$gt", new BsonArray { new BsonDocument("$size", "$userLike"), 0 }),
                        true,
                        false
                    }
                )}
            }
        ),
        };

        var result = await _workouts.Aggregate<WorkoutViewModel>(pipeline).ToListAsync();

        return result;
    }


    public async Task<List<WorkoutViewModel>> GetAllRecentlyCreatedWorkoutsByDate(int limit, string userId)
    {
        var pipeline = new BsonDocument[]
        {
            new BsonDocument("$match", new BsonDocument("isPublic", true)),
            new BsonDocument("$sort", new BsonDocument("createdAt", -1)),
            new BsonDocument("$limit", limit),
            new BsonDocument("$lookup",
                new BsonDocument
                {
                    { "from", "users" },
                    { "localField", "createdBy" },
                    { "foreignField", "_id" },
                    { "as", "createdUser" }
                }
            ),
            new BsonDocument("$unwind", "$createdUser"),
            new BsonDocument("$lookup",
                new BsonDocument
                {
                    { "from", "WorkoutLikes" },
                    { "let", new BsonDocument("workoutId", "$_id") },
                    { "pipeline", new BsonArray
                        {
                            new BsonDocument("$match",
                                new BsonDocument("$expr",
                                    new BsonDocument("$and",
                                        new BsonArray
                                        {
                                            //Checking if workoutId from WorkoutLikes collection is equal to workoutId from workouts collection
                                            new BsonDocument("$eq", new BsonArray { "$workoutId", "$$workoutId" }),
                                            //Checking if userId from WorkoutLikes collection is equal to userId from users collection
                                            new BsonDocument("$eq", new BsonArray { "$userId", new ObjectId(userId) })
                                        }
                                    )
                                )
                            )
                        }
                    },
                    { "as", "userLike" }
                }
            ),
            new BsonDocument("$project",
                new BsonDocument
                {
                    { "WorkoutName", "$workoutName" },
                    { "WorkoutDescription", "$workoutDescription" },
                    { "Exercises", "$exercises" },
                    { "IsPublic", "$isPublic"},
                    { "CreatedAt", "$createdAt" },
                    { "CreatedByUsername", "$createdUser.profile.username" },
                    { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                    { "UserLiked", new BsonDocument("$cond",
                        // Check if there are any objects in the userLike array if so then return true else return false
                        new BsonArray
                        {
                            new BsonDocument("$gt", new BsonArray { new BsonDocument("$size", "$userLike"), 0 }),
                            true,
                            false
                        }
                    )}
                }
            ),
        };

        var result = await _workouts.Aggregate<WorkoutViewModel>(pipeline).ToListAsync();

        return result;
    }

    public async Task<List<ExerciseViewModel>> GetWorkoutsExercises(string workoutId, string userId)
    {
        Workout workout = _workouts.FindAsync(w => w.Id == workoutId).Result.FirstOrDefault();
        if (workout == null)
        {
            throw new NotFoundException("Workout");
        }
        if (!workout.isPublic && workout.CreatedBy != userId)
        {
            throw new InvalidAccessException("view");
        }
        List<ExerciseViewModel> exercises = new List<ExerciseViewModel>();
        foreach (string exerciseId in workout.Exercises)
        {
            ExerciseViewModel exercise = await _exerciseService.GetExerciseByIdAsync(exerciseId);
            if (exercise != null)
            {
                exercises.Add(exercise);
            }
            //Cleans deleted exercises from the workout.
            else
            {
                //Update workouts exercise by remove this exercise id
                List<string> updatedExercises = workout.Exercises.FindAll(e => e != exerciseId);
                var updateExercises = Builders<Workout>.Update.Set("exercises", updatedExercises);
                await _workouts.UpdateOneAsync(w => w.Id == workoutId, updateExercises);
            }
        }
        return exercises;
    }
    public async Task<List<WorkoutViewModel>> GetAllPublicWorkoutFromUsername(string username, string userId)
    {
        var pipeline = new BsonDocument[]
        {
        new BsonDocument("$sort", new BsonDocument("createdAt", -1)),
        new BsonDocument("$match", new BsonDocument("isPublic", true)),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "users" },
                { "localField", "createdBy" },
                { "foreignField", "_id" },
                { "as", "createdUser" }
            }
        ),
        new BsonDocument("$unwind", "$createdUser"),
        new BsonDocument("$match", new BsonDocument("createdUser.profile.username", username)),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "WorkoutLikes" },
                { "let", new BsonDocument("workoutId", "$_id") },
                { "pipeline", new BsonArray
                    {
                        new BsonDocument("$match",
                            new BsonDocument("$expr",
                                new BsonDocument("$and",
                                    new BsonArray
                                    {
                                        //Checking if workoutId from WorkoutLikes collection is equal to workoutId from workouts collection
                                        new BsonDocument("$eq", new BsonArray { "$workoutId", "$$workoutId" }),
                                        //Checking if userId from WorkoutLikes collection is equal to userId from users collection
                                        new BsonDocument("$eq", new BsonArray { "$userId", new ObjectId(userId) })
                                    }
                                )
                            )
                        )
                    }
                },
                { "as", "userLike" }
            }
        ),
        new BsonDocument("$project",
            new BsonDocument
            {
                { "WorkoutName", "$workoutName" },
                { "WorkoutDescription", "$workoutDescription" },
                { "Exercises", "$exercises" },
                { "IsPublic", "$isPublic"},
                { "CreatedAt", "$createdAt" },
                { "CreatedByUsername", "$createdUser.profile.username" },
                { "CreatedByPhotoUrl", "$createdUser.profile.avatar" },
                { "UserLiked", new BsonDocument("$cond",
                    // Check if there are any objects in the userLike array if so then return true else return false
                    new BsonArray
                    {
                        new BsonDocument("$gt", new BsonArray { new BsonDocument("$size", "$userLike"), 0 }),
                        true,
                        false
                    }
                )}
            }
        ),
        };
        var result = await _workouts.Aggregate<WorkoutViewModel>(pipeline).ToListAsync();
        return result;
    }
}