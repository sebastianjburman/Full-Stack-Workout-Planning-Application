using Backend.Interfaces;

namespace Backend.Models
{
    public class WorkoutStoreDatabaseSettings : IWorkoutStoreDatabaseSettings
    {
        public string WorkoutCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;

    }
}