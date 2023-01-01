using Backend.Models;
using Backend.DTO;
using Backend.Interfaces;
using MongoDB.Driver;
using Backend.Helpers;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private IMongoClient _client;
        private IMongoDatabase _database;
        private IMongoCollection<User> _usersCollection;
        public UserService(IUserStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            _client = new MongoClient(settings.ConnectionString);
            _database = _client.GetDatabase(settings.DatabaseName);
            _usersCollection = _database.GetCollection<User>("users");

            // Create the unique indexes
            var options = new CreateIndexOptions { Unique = true };
            _usersCollection.Indexes.CreateOne("{email:1}", options);
            _usersCollection.Indexes.CreateOne("{username:1}", options);

        }
        public async Task CreateUser(UserDTO userDTO)
        {
            User user = userDTO.ToUser();
            user.Hash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            await _usersCollection.InsertOneAsync(user);
        }
    }
}