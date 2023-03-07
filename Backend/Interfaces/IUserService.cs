using Backend.DTO;
using MongoDB.Bson;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(UserDTO user);
        UserDTO GetUser(ObjectId id);
        UserProfileDTO GetUserProfileByUsername(string userName);
        string Authenticate(string email, string password, bool rememberMe);
        public List<UserProfileDTO> GetProfiles(int count);
    }
}