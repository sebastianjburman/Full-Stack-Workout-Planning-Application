using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(UserDTO user);
        string Authenticate(string email, string password, bool rememberMe);
    }
}