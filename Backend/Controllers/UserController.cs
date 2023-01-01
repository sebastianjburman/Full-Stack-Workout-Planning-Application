using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTO;

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
        [HttpPost("/authenticate")]
        public ActionResult<string> Authenticate([FromBody] UserLoginDTO loginUser)
        {
            if(ModelState.IsValid){
                string authenticate = _userService.Authenticate(loginUser.Email!,loginUser.Password!);
                return authenticate;
            }
            else{
                return BadRequest(ModelState);
            }
        }
    }
}