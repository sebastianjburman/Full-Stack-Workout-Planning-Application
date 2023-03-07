using System.Collections.Generic;
using System.Threading.Tasks;

public interface IExerciseService
{
    Task<Exercise> GetExerciseByIdAsync(string id, string userId);

    Task<Exercise> CreateExerciseAsync(Exercise exercise, string createdBy);

    Task UpdateExerciseAsync(string exerciseId, string userId, Exercise exerciseIn);
}
