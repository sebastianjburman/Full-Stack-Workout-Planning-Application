using Backend.Models;
using Backend.Interfaces;
using MongoDB.Driver;

namespace Backend.Services
{
    public class WorkoutLikeService : IWorkoutLikeService
    {
        private readonly IMongoCollection<WorkoutLike> _workoutLikes;
        public WorkoutLikeService(IWorkoutLikeStoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _workoutLikes = database.GetCollection<WorkoutLike>(settings.CollectionName);

            // Create unique indexes
            var workoutIdKey = Builders<WorkoutLike>.IndexKeys.Ascending(x => x.WorkoutId);
            var userIdKey = Builders<WorkoutLike>.IndexKeys.Ascending(x => x.UserId);
            // Combine the two keys into a composite key
            var indexKeys = Builders<WorkoutLike>.IndexKeys.Combine(workoutIdKey, userIdKey); 
            var uniqueIndexOption = new CreateIndexOptions { Unique = true };
            var indexModel = new CreateIndexModel<WorkoutLike>(indexKeys, uniqueIndexOption);
            _workoutLikes.Indexes.CreateOne(indexModel);
        }
        public async Task LikeWorkoutAsync(string workoutId, string userId)
        {
            WorkoutLike workoutLike = new WorkoutLike
            {
                WorkoutId = workoutId,
                UserId = userId,
                LastEdited = DateTime.Now
            };
            await _workoutLikes.InsertOneAsync(workoutLike);
        }
        public async Task UnlikeWorkoutAsync(string workoutId, string userId)
        {
            await _workoutLikes.DeleteOneAsync(wl => wl.WorkoutId == workoutId && wl.UserId == userId);
        }

        public async Task DeleteAllLikesByWorkoutIdAsync(string workoutId)
        {
            await _workoutLikes.DeleteManyAsync(wl => wl.WorkoutId == workoutId);
        }
    }
}