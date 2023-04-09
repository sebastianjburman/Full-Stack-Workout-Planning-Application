namespace Backend.Interfaces
{
    public interface IServiceDatabaseSettings
    {
        string ConnectionString { get;set;}
        string DatabaseName { get;set;}
    }
}