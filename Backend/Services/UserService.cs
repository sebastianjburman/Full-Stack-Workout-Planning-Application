using Backend.Models;
using Backend.Interfaces;
using MongoDB.Driver;

namespace Backend.Services
{
    public class UserService:IUserService
    {
        private IMongoClient _client;
        private IMongoDatabase _database;
        private IMongoCollection<User> _usersCollection;

        public UserService(IUserStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            _client = new MongoClient(settings.ConnectionString);
            _database = _client.GetDatabase(settings.DatabaseName);
            _usersCollection = _database.GetCollection<User>("users");
        }
        public async Task CreateUser(User user)
        {
            await _usersCollection.InsertOneAsync(user);
        }
    }
}