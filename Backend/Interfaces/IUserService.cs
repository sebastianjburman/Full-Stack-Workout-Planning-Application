using Backend.DTO;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(UserDTO user);
    }
}