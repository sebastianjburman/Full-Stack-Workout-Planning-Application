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

    public async Task<Exercise> GetExerciseByIdAsync(string id)
    {
        return await _exercises.Find(e => e.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Exercise> CreateExerciseAsync(Exercise exercise)
    {
        //Make exercise id null so that mongo will generate a new one
        exercise.Id = null;
        await _exercises.InsertOneAsync(exercise);

        return exercise;
    }

    public async Task UpdateExerciseAsync(string id, Exercise exerciseIn)
    {
        await _exercises.ReplaceOneAsync(e => e.Id == id, exerciseIn);
    }
}
