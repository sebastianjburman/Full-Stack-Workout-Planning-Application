using Backend.DTO;
using MongoDB.Bson;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(UserDTO user);
        User GetUser(string id);
        UserProfileDTO GetUserProfileByUsername(string userName);
        string Authenticate(string email, string password, bool rememberMe);
        List<UserProfileDTO> GetProfiles(int count);
    }
}