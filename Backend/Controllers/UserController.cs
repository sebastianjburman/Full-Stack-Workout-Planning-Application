using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTO;
using Backend.Exceptions;
using Backend.Helpers;
using Backend.Models;
using MongoDB.Bson;

namespace Backend.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IWeightService _weightEntryService;
        private readonly IPhotoService _photoService;

        public UserController(ILogger<UserController> logger, IUserService userService, IWeightService weightEntryService, IPhotoService photoService)
        {
            _logger = logger;
            _userService = userService;
            _weightEntryService = weightEntryService;
            _photoService = photoService;
        }
        [Authorize]
        [HttpGet("checkauth")]
        public ActionResult CheckAuthentication()
        {
            var contextUser = HttpContext.Items["User"];
            if (contextUser == null)
            {
                return NotFound(false);
            }
            return Ok(true);
        }
        [Authorize]
        [HttpGet("profile")]
        public ActionResult GetUserProfile([FromQuery] string userName)
        {
            try
            {
                UserProfileDTO userProfile = _userService.GetUserProfileByUsername(userName);
                return Ok(userProfile);
            }
            catch
            {
                return NotFound("No user found");
            }
        }
        [Authorize]
        [HttpGet("profiles")]
        public ActionResult GetProfiles()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            //Return 20 random profiles
            List<UserProfileDTO> profiles = _userService.GetProfiles(20);
            //Filter to exclude the current user
            IEnumerable<UserProfileDTO> filteredProfiles = profiles.Where(profile => profile.UserName != contextUser!.profile.UserName);
            return Ok(filteredProfiles);
        }
        [Authorize]
        [HttpGet("myprofile")]
        public ActionResult GetUsersProfile()
        {
            User contextUser = (User)HttpContext.Items["User"]!;
            if (contextUser == null)
            {
                return NotFound("User profile was not found");
            }
            return Ok(contextUser.ToUserDTO().profile);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] UserDTO newUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    /*
                    ObjectId userObjectId = ObjectId.GenerateNewId();
                    await _userService.CreateUser(newUser, userObjectId);
                    await _weightEntryService.Create(Math.Round(newUser.CurrentWeight, 2), userObjectId.ToString());
                    */
                    return BadRequest("User creation is disabled. If you would like try out this application, please email me.");
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
                    string authenticate = _userService.Authenticate(loginUser.Email!, loginUser.Password!, loginUser.RememberMe);
                    return Ok(new TokenDTO { Token = authenticate });
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
        [Authorize]
        [HttpPost("weightentry")]
        public async Task<ActionResult> CreateWeightEntry([FromBody] WeightEntry weightEntry)
        {
            try
            {
                User contextUser = (User)HttpContext.Items["User"]!;
                await _weightEntryService.Create(Math.Round(weightEntry.Weight, 2), contextUser.Id!);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpDelete("weightentry")]
        public async Task<ActionResult> DeleteWeightEntry(string id)
        {
            try
            {
                User contextUser = (User)HttpContext.Items["User"]!;
                await _weightEntryService.Delete(id, contextUser.Id!);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet("weightentries")]
        public async Task<ActionResult> GetWeightEntries()
        {
            try
            {
                User contextUser = (User)HttpContext.Items["User"]!;
                List<WeightEntry> weightEntries = await _weightEntryService.GetRecentMonthWeightEntry(contextUser.Id!);
                return Ok(weightEntries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpPost("profilephoto")]
        public async Task<ActionResult> UploadProfilePhoto([FromForm] IFormFile? file)
        {
            string baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            try
            {
                User contextUser = (User)HttpContext.Items["User"]!;
                if (file == null)
                {
                    await _photoService.DeletePhotoAsync(contextUser.Id!);
                    return Ok();
                }
                if (!_photoService.IsImage(file))
                {
                    return BadRequest("Invalid file format");
                }
                await _photoService.UpdatePhotoAsync(contextUser.Id!, await ConvertFormFileToByteArray(file), baseUrl);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("profilephoto")]
        public async Task<ActionResult> GetProfilePhoto(string Id)
        {
            try
            {
                byte[] profilePhoto = await _photoService.GetPhotoAsync(Id);
                if (profilePhoto == null)
                {
                    return NotFound();
                }
                return File(profilePhoto, "image/jpeg");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet("profilesearch")]
        public async Task<ActionResult> SearchProfiles(string search)
        {
            try
            {
                List<UserProfileDTO> profiles = await _userService.SearchProfilesAsync(search);
                return Ok(profiles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private async Task<byte[]> ConvertFormFileToByteArray([FromForm] IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}