using Backend.Models;
namespace Backend.Interfaces
{
    public interface IWorkoutService
    {
        Task<Workout> GetWorkoutByIdAsync(string id, string userId);
        Task<Workout> CreateWorkoutAsync(Workout workout, string createdBy);
        Task UpdateWorkoutAsync(string workoutId, string userId, Workout workoutIn);
        Task<List<WorkoutViewModel>> GetAllWorkoutsCreatedAsync(string userId);
    }
}