using System.ComponentModel.DataAnnotations;
namespace Backend.DTO
{
    public class UserLoginDTO
    {
        [Required]
        [RegularExpression(@"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", ErrorMessage = "Email is not in correct format.")]
        public string? Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$", ErrorMessage = "Password be minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, and one number.")]
        public string? Password { get; set; }
    }
}