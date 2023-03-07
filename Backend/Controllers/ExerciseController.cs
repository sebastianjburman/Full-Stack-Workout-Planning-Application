using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTO;
using Backend.Exceptions;
using Backend.Helpers;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IExerciseService _exerciseService;

        public ExerciseController(ILogger<UserController> logger, IExerciseService exerciseService)
        {
            _logger = logger;
            _exerciseService = exerciseService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetExercise(string id)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                Exercise exercise = await _exerciseService.GetExerciseByIdAsync(id, contextUser.Id.ToString());
                if (exercise == null)
                {
                    return NotFound(new { message = "Exercise not found" });
                }
                return Ok(exercise);
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
        public async Task<ActionResult> CreateExercise(Exercise createdExercise)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _exerciseService.CreateExerciseAsync(createdExercise, contextUser.Id.ToString());
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateExercise(string id, Exercise updatedExercise)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _exerciseService.UpdateExerciseAsync(id, contextUser.Id.ToString(), updatedExercise);
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