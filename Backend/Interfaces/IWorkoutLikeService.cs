namespace Backend.Interfaces
{
    public interface IWorkoutLikeService
    {
        Task LikeWorkoutAsync(string workoutId, string userId);
        Task UnlikeWorkoutAsync(string workoutId, string userId);
    }
}