using Backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
namespace Backend.DTO
{
    public class UserDTO
    {
        [BsonElement("email")]
        [Required]
        [RegularExpression(@"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", ErrorMessage = "Email is not in correct format.")]
        public string? Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$", ErrorMessage = "Password be minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, and one number.")]
        [BsonElement("password")]
        public string? Password { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$",ErrorMessage = "First name is not in correct format.")]
        [BsonElement("firstname")]
        public string? FirstName { get; set; }
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$",ErrorMessage = "Last name is not in correct format.")] 
        [Required]
        [BsonElement("lastname")]
        public string? LastName { get; set; }
        [Required]
        [RegularExpression(@"^(?:[1-9][0-9]?|1[01][0-9]|120)$", ErrorMessage ="Age must be 1-120")]
        [BsonElement("age")]
        public int Age { get; set; }
        [BsonElement("currentweight")]
        [Range(10, 1000, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        [Required]
        public double CurrentWeight { get; set; }
        [Required]
        //Range in inches = 4 feet to 8 feet
        [Range(48, 96, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        [BsonElement("height")]
        public int Height { get; set; }
        [Required]
        [BsonElement("profile")]
        public UserProfileDTO profile { get; set; } = new UserProfileDTO();
    }
}