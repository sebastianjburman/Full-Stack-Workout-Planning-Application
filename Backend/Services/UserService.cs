using Backend.Models;
using Backend.DTO;
using Backend.Interfaces;
using MongoDB.Driver;
using Backend.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Backend.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private IMongoClient _client;
        private IMongoDatabase _database;
        private IMongoCollection<User> _usersCollection;
        private readonly JwtSecret _jwtSecret;
        public UserService(IServiceDatabaseSettings settings, IMongoClient mongoClient, IOptions<JwtSecret> jwtSecret)
        {
            _client = new MongoClient(settings.ConnectionString);
            _database = _client.GetDatabase(settings.DatabaseName);
            _usersCollection = _database.GetCollection<User>("users");
            _jwtSecret = jwtSecret.Value;

            // Create the unique indexes
            var emailKey = Builders<User>.IndexKeys.Ascending(x => x.Email);
            var userNameKey = Builders<User>.IndexKeys.Ascending(x => x.profile.UserName);
            var uniqueIndexOption = new CreateIndexOptions { Unique = true };
            var emailIndexModel = new CreateIndexModel<User>(emailKey, uniqueIndexOption);
            var userNameIndexModel = new CreateIndexModel<User>(userNameKey, uniqueIndexOption);
            _usersCollection.Indexes.CreateOne(emailIndexModel);
            _usersCollection.Indexes.CreateOne(userNameIndexModel);
        }
        public async Task CreateUser(UserDTO userDTO, ObjectId generatedUserId)
        {
            User user = userDTO.ToUser();
            user.CurrentWeight = Math.Round(user.CurrentWeight, 2);
            user.Id = generatedUserId.ToString();
            //Make unique fields lowercase
            user.Email = user.Email?.ToLower();
            user.profile.UserName = user.profile.UserName?.ToLower();
            // Hash users password
            user.Hash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            await _usersCollection.InsertOneAsync(user);
        }
        public User GetUser(string id)
        {
            User foundUser = _usersCollection.Find(user => user.Id == id).FirstOrDefault();
            return foundUser;
        }
        public List<UserProfileDTO> GetProfiles(int count)
        {
            IMongoQueryable<User> users = _usersCollection.AsQueryable().Sample(count);
            List<UserProfileDTO> userProfiles = new List<UserProfileDTO>();
            foreach (var user in users)
            {
                userProfiles.Add(user.profile.ToUserProfileDTO());
            }
            return userProfiles;
        }
        public async Task<List<UserProfileDTO>> SearchProfilesAsync(string search)
        {
            var filterBuilder = Builders<User>.Filter;
            var filter = filterBuilder.Regex(x=>x.profile.UserName, new BsonRegularExpression(search, "i"));
            List<User> userProfiles = await _usersCollection.FindAsync(filter).Result.ToListAsync();
            List<UserProfileDTO> userProfilesDTO = new List<UserProfileDTO>();
            foreach (var user in userProfiles)
            {
                userProfilesDTO.Add(user.profile.ToUserProfileDTO());
            }
            return userProfilesDTO; 
        }
        public string Authenticate(string email, string password, bool rememberMe)
        {
            User foundUser = _usersCollection.Find(user => user.Email == email).FirstOrDefault();
            if (foundUser != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(password, foundUser.Hash);
                if (verified)
                {
                    return GenerateJwtToken(foundUser, rememberMe);
                }
                else
                {
                    throw new UserNotFoundException();
                }
            }
            else
            {
                throw new UserNotFoundException();
            }
        }
        public UserProfileDTO GetUserProfileByUsername(string userName)
        {
            User foundUser = _usersCollection.Find(user => user.profile.UserName == userName).FirstOrDefault();
            if (foundUser == null)
            {
                throw new UserNotFoundException();
            }
            return foundUser.ToUserDTO().profile;
        }

        private string GenerateJwtToken(User user, bool rememberMe)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret.Secret);
            int hoursTillExpire = 1;
            if (rememberMe)
            {
                //2 days till expire
                hoursTillExpire = 48;
            }
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id!.ToString())}),
                Expires = DateTime.UtcNow.AddHours(hoursTillExpire),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}