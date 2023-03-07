using Backend.Exceptions;
using Backend.Interfaces;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ExerciseService : IExerciseService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<Exercise> _exercises;

    public ExerciseService(IExerciseStoreDatabaseSettings settings, IMongoClient client)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _exercises = _database.GetCollection<Exercise>("exercises");
    }

    public async Task<Exercise> GetExerciseByIdAsync(string id, string userId)
    {
        Exercise exercise = await _exercises.Find(e => e.Id == id).FirstOrDefaultAsync();
        if (exercise.CreatedBy != userId)
        {
            throw new InvalidAccessException();
        }
        return exercise;

    }

    public async Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy)
    {
        //Make exercise id null so that mongo will generate a new one.
        exercise.Id = null;
        //Set the exercise's created by to the user who created the
        exercise.CreatedBy = createdBy;
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
            throw new InvalidAccessException();
        }
        await _exercises.ReplaceOneAsync(e => e.Id == exerciseId, exerciseIn);
    }
}
