using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
namespace Backend.DTO
{
    public class UserProfileDTO
    {
        [BsonElement("bio")]
        public string? Bio { get; set; }
        public string? Avatar{get;set;}
    }
}