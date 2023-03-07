using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTO;
using Backend.Exceptions;
using Backend.Helpers;

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
            Exercise exercise = await _exerciseService.GetExerciseByIdAsync(id);
            if (exercise == null)
            {
                return NotFound(new { message = "Exercise not found" });
            }
            return Ok(exercise);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateExercise(Exercise createdExercise)
        {
            try
            {
                await _exerciseService.CreateExerciseAsync(createdExercise);
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
            try
            {
                await _exerciseService.UpdateExerciseAsync(id, updatedExercise);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}