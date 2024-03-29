using Backend.Models;
namespace Backend.Interfaces
{
    public interface IWorkoutService
    {
        Task<WorkoutViewModel> GetWorkoutByIdAsync(string id, string userId);
        Task<Workout> CreateWorkoutAsync(Workout workout, string createdBy);
        Task UpdateWorkoutAsync(string workoutId, string userId, Workout workoutIn);
        Task DeleteWorkoutAsync(string workoutId, string userId);
        Task<List<WorkoutViewModel>> GetAllWorkoutsCreatedAsync(string userId);
        Task<List<WorkoutViewModel>> GetAllRecentlyCreatedWorkoutsByDate(int limit, string userId);
        Task<List<ExerciseViewModel>> GetWorkoutsExercises(string workoutId, string userId);
        Task<List<WorkoutViewModel>> GetAllPublicWorkoutFromUsername(string username, string userId);
        Task<List<WorkoutViewModel>> GetAllPublicLikedWorkoutsForUser(string userId);
        Task<List<TopWorkoutViewModel>> GetMostLikedWorkouts(string userId, int count);
        Task<List<Workout>> SearchPublicWorkoutsAsync(string userId, string search);
    }
}