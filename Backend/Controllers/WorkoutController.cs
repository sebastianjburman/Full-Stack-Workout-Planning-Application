using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.Exceptions;
using Backend.Helpers;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IWorkoutService _workoutService;

        public WorkoutController(ILogger<UserController> logger, IWorkoutService workoutService)
        {
            _logger = logger;
            _workoutService = workoutService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetWorkout(string id)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                Workout workout = await _workoutService.GetWorkoutByIdAsync(id, contextUser.Id.ToString());
                return Ok(workout);
            }
            catch (NotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
            catch (InvalidAccessException e)
            {
                return Unauthorized(new { message = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateWorkout(Workout createdWorkout)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _workoutService.CreateWorkoutAsync(createdWorkout, contextUser.Id.ToString());
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateWorkout(string id, Workout updatedWorkout)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _workoutService.UpdateWorkoutAsync(id, contextUser.Id.ToString(), updatedWorkout);
                return Ok();
            }
            catch (InvalidAccessException e)
            {
                return Unauthorized(new { message = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}