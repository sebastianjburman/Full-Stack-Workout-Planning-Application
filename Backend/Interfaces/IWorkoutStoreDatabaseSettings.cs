namespace Backend.Interfaces
{
    public interface IWorkoutStoreDatabaseSettings
    {
        string WorkoutCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}