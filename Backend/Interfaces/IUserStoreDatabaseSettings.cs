namespace Backend.Interfaces
{
    public interface IUserStoreDatabaseSettings
    {
        string UsersCollectionName { get;set;}
        string ConnectionString { get;set;}
        string DatabaseName { get;set;}
    }
}