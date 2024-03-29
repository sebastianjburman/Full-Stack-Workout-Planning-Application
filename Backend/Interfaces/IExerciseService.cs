using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IExerciseService
    {
        Task<ExerciseViewModel> GetExerciseByIdAsync(string id);
        Task<List<ExerciseViewModel>> GetAllExerciseCreatedAsync(string userId);
        Task<List<Exercise>> GetAllExerciseCreatedSearchAsync(string userId, string search);
        Task<List<ExerciseViewModel>> GetAllRecentlyCreatedExercisesByDate(int limit);
        Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy);
        Task DeleteExerciseAsync(string exerciseId, string userId);
        Task UpdateExerciseAsync(string exerciseId, string userId, Exercise exerciseIn);
        Task<List<User>> GetTopUsersByExerciseCountAsync(int limit);
        Task<List<Exercise>> SearchExercisesAsync(string search);
    }
}

