using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTO;
using Backend.Exceptions;

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
        public async Task<ActionResult> CreateUser([FromBody] UserDTO newUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _userService.CreateUser(newUser);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost("authenticate")]
        public ActionResult Authenticate([FromBody] UserLoginDTO loginUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string authenticate = _userService.Authenticate(loginUser.Email!, loginUser.Password!,loginUser.RememberMe);
                    return Ok(new TokenDTO{Token = authenticate});
                }
                catch (UserNotFoundException ex)
                {
                    return NotFound(ex.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}