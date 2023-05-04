using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.Exceptions;
using Backend.Helpers;
using Backend.Models;
using MongoDB.Driver;

namespace Backend.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IWorkoutService _workoutService;
        private readonly IWorkoutLikeService _workoutLikeService;

        public WorkoutController(ILogger<UserController> logger, IWorkoutService workoutService, IWorkoutLikeService workoutLikeService)
        {
            _logger = logger;
            _workoutService = workoutService;
            _workoutLikeService = workoutLikeService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetWorkout(string id)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                WorkoutViewModel workout = await _workoutService.GetWorkoutByIdAsync(id, contextUser.Id!);
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
                await _workoutService.CreateWorkoutAsync(createdWorkout, contextUser.Id!);
                return Ok();
            }
            catch (MongoWriteException)
            {
                return BadRequest(new { message = "Workout name is already taken" });
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
                await _workoutService.UpdateWorkoutAsync(id, contextUser.Id!, updatedWorkout);
                return Ok();
            }
            catch (MongoWriteException)
            {
                return BadRequest(new { message = "Workout name is already taken" });
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
        [HttpDelete]
        public async Task<ActionResult> DeleteWorkout(string id)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _workoutService.DeleteWorkoutAsync(id, contextUser.Id!);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpGet("created")]
        public async Task<ActionResult> GetExercisesCreated()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                List<WorkoutViewModel> workouts = await _workoutService.GetAllWorkoutsCreatedAsync(contextUser.Id!);
                return Ok(workouts);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpGet("recent")]
        public async Task<ActionResult> GetRecentlyCreatedWorkouts()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            int limit = 10;

            try
            {
                List<WorkoutViewModel> workouts = await _workoutService.GetAllRecentlyCreatedWorkoutsByDate(limit, contextUser.Id!);
                return Ok(workouts);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpPost("like")]
        public async Task<ActionResult> LikeWorkout(string workoutId)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _workoutLikeService.LikeWorkoutAsync(workoutId, contextUser.Id!);
                return Ok();
            }
            catch (MongoWriteException)
            {
                return BadRequest(new { message = "You already liked this workout" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpDelete("unlike")]
        public async Task<ActionResult> UnlikeWorkout(string workoutId)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                await _workoutLikeService.UnlikeWorkoutAsync(workoutId, contextUser.Id!);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpGet("workoutexercises")]
        public async Task<ActionResult> GetWorkoutExercises(string workoutId)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                List<ExerciseViewModel> workoutExercises = await _workoutService.GetWorkoutsExercises(workoutId, contextUser.Id!);
                return Ok(workoutExercises);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpGet("createdusername")]
        public async Task<ActionResult> GetExercisesCreatedByUsername(string username)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                List<WorkoutViewModel> workouts = await _workoutService.GetAllPublicWorkoutFromUsername(username, contextUser.Id!);
                return Ok(workouts);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpGet("liked")]
        public async Task<ActionResult> GetWorkoutsLikedByUser()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                List<WorkoutViewModel> workouts = await _workoutService.GetAllPublicLikedWorkoutsForUser(contextUser.Id!);
                return Ok(workouts);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}