using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IExerciseService
    {
        Task<Exercise> GetExerciseByIdAsync(string id, string userId);

        Task<List<Exercise>> GetAllExerciseCreatedAsync(string userId);

        Task<List<Exercise>> GetAllRecentlyCreatedExercisesByDate(int limit);

        Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy);

        Task UpdateExerciseAsync(string exerciseId, string userId, Exercise exerciseIn);
        Task<List<User>> GetTopUsersByExerciseCountAsync(int limit);
    }
}

