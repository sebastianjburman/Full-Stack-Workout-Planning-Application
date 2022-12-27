using Backend.Models;
using Backend.DTO;
using Backend.Interfaces;
using MongoDB.Driver;
using Backend.Helpers;

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
        public async Task CreateUser(UserDTO userDTO)
        {
            User user = userDTO.ToUser();
            //Hash Users password 
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            user.Hash = hashedPassword; 
            await _usersCollection.InsertOneAsync(user);
        }
    }
}