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
        [BsonElement("bio")]
        public string? Bio { get; set; }
    }
}