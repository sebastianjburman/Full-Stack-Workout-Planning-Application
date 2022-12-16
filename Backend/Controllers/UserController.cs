using Microsoft.AspNetCore.Mvc;

namespace workout_planning_application_backend.Controllers;

[ApiController]
[Route("v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string Get()
    {
        return "User";
    }
}