using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class WorkoutViewModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? WorkoutName { get; set; }
        public string? WorkoutDescription {get; set;}
        public List<string>? Exercises {get;set;}
        public DateTime CreatedAt { get; set; }
        public bool UserLiked { get; set; }
        public bool IsPublic { get; set; }
        public string? CreatedByUsername { get; set; }
        public string? CreatedByPhotoUrl { get; set; }
    }
}