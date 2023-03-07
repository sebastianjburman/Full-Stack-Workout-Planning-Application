using Backend.Exceptions;
using Backend.Interfaces;
using Backend.Models;
using MongoDB.Driver;

public class WorkoutService : IWorkoutService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<Workout> _workouts;

    public WorkoutService(IWorkoutStoreDatabaseSettings settings, IMongoClient client)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _workouts = _database.GetCollection<Workout>("workouts");
    }

    public async Task<Workout> GetWorkoutByIdAsync(string id, string userId)
    {
        Workout workout = await _workouts.Find(e => e.Id == id).FirstOrDefaultAsync();
        if (!workout.isPublic && workout.CreatedBy != userId)
        {
            throw new InvalidAccessException();
        }
        return workout;
    }

    public async Task<Workout> CreateWorkoutAsync(Workout workout, string createdBy)
    {
        //Make workout id null so that mongo will generate a new one.
        workout.Id = null;
        //Set the workouts's created by to the user who created the
        workout.CreatedBy = createdBy;
        await _workouts.InsertOneAsync(workout);
        return workout;
    }

    public async Task UpdateWorkoutAsync(string workoutId, string userId, Workout workoutIn)
    {
        //Make sure the user doesn't change the workouts's created by
        Workout workout = await _workouts.Find(e => e.Id == workoutId).FirstOrDefaultAsync();
        if (workoutIn.CreatedBy != workout.CreatedBy)
        {
            throw new Exception("You cannot change the workouts's created by.");
        }
        if (workout.CreatedBy != userId)
        {
            throw new InvalidAccessException();
        }
        await _workouts.ReplaceOneAsync(e => e.Id == workoutId, workoutIn);
    }

}