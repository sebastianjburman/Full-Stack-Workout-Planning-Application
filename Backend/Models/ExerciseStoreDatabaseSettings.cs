using Backend.Interfaces;

namespace Backend.Models
{
    public class ExerciseStoreDatabaseSettings : IExerciseStoreDatabaseSettings
    {
        public string UsersCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;

    }
}