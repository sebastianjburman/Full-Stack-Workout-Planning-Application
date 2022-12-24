using Backend.Models;
namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(User user);
    }
}