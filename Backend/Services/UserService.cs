using Backend.Models;
using Backend.DTO;
using Backend.Interfaces;
using MongoDB.Driver;
using Backend.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

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
            //Make unique fields lowercase
            user.Email = user.Email?.ToLower();
            user.UserName = user.UserName?.ToLower();
            // Hash users password
            user.Hash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            await _usersCollection.InsertOneAsync(user);
        }
        public string Authenticate(string email, string password)
        {
            User foundUser = _usersCollection.Find(user => user.Email == email).FirstOrDefault();
            if (foundUser != null )
            {
                bool verified = BCrypt.Net.BCrypt.Verify(password, foundUser.Hash);
                if(verified){
                    return GenerateJwtToken(foundUser);
                }
                else{
                    return "User not found";
                }
            }
            else
            {
                return "User not found";
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjYwODA4NCwiaWF0IjoxNjcyNjA4MDg0fQ.3Xerv6eY7OVSWmw3Cr829ScidVu3cD8XUcieY-uAc0c");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}