using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Controllers
{

    [ApiController]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        public async Task<string>CreateUser([FromBody] User newUser)
        {
            await _userService.CreateUser(newUser);
            return "Success"; 
        }
    }
}