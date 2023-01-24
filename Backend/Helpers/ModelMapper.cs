using Backend.Models;
using Backend.DTO;

namespace Backend.Helpers
{
    public static class ModelMapper
    {
        public static UserDTO ToUserDTO(this User user)
        {
            return new UserDTO()
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Age = user.Age,
                CurrentWeight = user.CurrentWeight,
                Height = user.Height,
                profile = user.profile.ToUserProfileDTO()
            };
        }
        public static User ToUser(this UserDTO userDTO)
        {
            return new User()
            {
                Email = userDTO.Email,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Age = userDTO.Age,
                CurrentWeight = userDTO.CurrentWeight,
                Height = userDTO.Height,
                profile = userDTO.profile.ToUserProfile()
            };
        }

        public static UserProfileDTO ToUserProfileDTO(this UserProfile userProfile)
        {
            return new UserProfileDTO()
            {
                Bio = userProfile.Bio,
                UserName = userProfile.UserName,
                Avatar = userProfile.Avatar 
            };
        }
        public static UserProfile ToUserProfile(this UserProfileDTO userProfileDTO)
        {
            return new UserProfile()
            {
                Bio = userProfileDTO.Bio,
                UserName = userProfileDTO.UserName
            };
        }
    }
}