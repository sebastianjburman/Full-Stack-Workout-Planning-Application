using Backend.DTO;
using MongoDB.Bson;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(UserDTO user);
        UserDTO GetUser(ObjectId id);
        string Authenticate(string email, string password, bool rememberMe);
    }
}