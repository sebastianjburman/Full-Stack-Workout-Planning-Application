using Backend.Interfaces;

namespace Backend.Models
{
    public class WorkoutLikeStoreDatabaseSettings : IWorkoutLikeStoreDatabaseSettings
    {
        public string CollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;

    }
}