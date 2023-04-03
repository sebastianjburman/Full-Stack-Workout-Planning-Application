using Backend.Models;
namespace Backend.Interfaces
{
    public interface IWorkoutService
    {
        Task<WorkoutViewModel> GetWorkoutByIdAsync(string id, string userId);
        Task<Workout> CreateWorkoutAsync(Workout workout, string createdBy);
        Task UpdateWorkoutAsync(string workoutId, string userId, Workout workoutIn);
        Task<List<WorkoutViewModel>> GetAllWorkoutsCreatedAsync(string userId);
        Task<List<WorkoutViewModel>> GetAllRecentlyCreatedWorkoutsByDate(int limit,string userId);
    }
}