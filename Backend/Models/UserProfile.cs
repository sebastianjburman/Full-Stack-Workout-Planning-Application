using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
namespace Backend.Models
{
    public class UserProfile
    {
        [Required]
        [BsonElement("avatar")]
        public string? Avatar { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$", ErrorMessage = "Username must be 5-20 characters alphanumeric characters.")]
        [BsonElement("username")]
        public string? UserName { get; set; }
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,150}$", ErrorMessage = "Bio is not in correct format. Max 150 characters.")]
        [BsonElement("bio")]
        public string? Bio { get; set; }
    }
}