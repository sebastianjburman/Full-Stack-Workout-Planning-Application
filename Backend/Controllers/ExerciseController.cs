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
        private readonly IUserService _userService;

        public ExerciseController(ILogger<UserController> logger, IExerciseService exerciseService, IUserService userService)
        {
            _logger = logger;
            _exerciseService = exerciseService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetExercise(string id)
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                Exercise exercise = await _exerciseService.GetExerciseByIdAsync(id, contextUser.Id!);
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
        [HttpGet("created")]
        public async Task<ActionResult> GetExerciseCreated()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            try
            {
                List<ExerciseViewModel> exerciseViewModels = new List<ExerciseViewModel>();
                List<Exercise> exercises = await _exerciseService.GetAllExerciseCreatedAsync(contextUser.Id!);
                foreach (Exercise exercise in exercises)
                {
                    User user = _userService.GetUser(exercise.CreatedBy!);
                    exerciseViewModels.Add(new ExerciseViewModel
                    {
                        Id = exercise.Id,
                        Name = exercise.Name,
                        Description = exercise.Description,
                        Sets = exercise.Sets,
                        Reps = exercise.Reps,
                        CreatedByUsername = user.profile.UserName,
                        CreatedByPhotoUrl = user.profile.Avatar,
                    });
                }

                return Ok(exerciseViewModels);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Authorize]
        [HttpGet("recent")]
        public async Task<ActionResult> GetRecentlyCreatedExercises()
        {
            int limit = 10;
            try
            {
                List<ExerciseViewModel> exerciseViewModels = new List<ExerciseViewModel>();
                List<Exercise> exercises = await _exerciseService.GetAllRecentlyCreatedExercisesByDate(limit);
                foreach (Exercise exercise in exercises)
                {
                    User user = _userService.GetUser(exercise.CreatedBy!);
                    exerciseViewModels.Add(new ExerciseViewModel
                    {
                        Id = exercise.Id,
                        Name = exercise.Name,
                        Description = exercise.Description,
                        Sets = exercise.Sets,
                        Reps = exercise.Reps,
                        CreatedByUsername = user.profile.UserName,
                        CreatedByPhotoUrl = user.profile.Avatar,
                    });
                }

                return Ok(exerciseViewModels);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Authorize]
        [HttpGet("topExerciseCreators")]
        public async Task<ActionResult> TopExerciseCreators()
        {
            int limit = 4;
            try
            {
                List<UserProfileDTO> userProfiles = new List<UserProfileDTO>();
                List<User> users = await _exerciseService.GetTopUsersByExerciseCountAsync(limit);
                foreach (User user in users)
                {
                    userProfiles.Add(user.profile.ToUserProfileDTO());
                }
                return Ok(userProfiles);
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
                await _exerciseService.CreateExerciseAsync(createdExercise, contextUser.Id!);
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
                await _exerciseService.UpdateExerciseAsync(id, contextUser.Id!, updatedExercise);
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