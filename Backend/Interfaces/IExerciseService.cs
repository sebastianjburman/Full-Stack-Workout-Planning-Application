using System.Collections.Generic;
using System.Threading.Tasks;

public interface IExerciseService
{
    Task<Exercise> GetExerciseByIdAsync(string id);

    Task<Exercise> CreateExerciseAsync(Exercise exercise);

    Task UpdateExerciseAsync(string id, Exercise exerciseIn);
}
