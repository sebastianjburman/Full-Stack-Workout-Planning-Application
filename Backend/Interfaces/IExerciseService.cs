using System.Collections.Generic;
using System.Threading.Tasks;
namespace Backend.Interfaces
{
    public interface IExerciseService
    {
        Task<Exercise> GetExerciseByIdAsync(string id, string userId);

        Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy);

        Task UpdateExerciseAsync(string exerciseId, string userId, Exercise exerciseIn);
    }
}

