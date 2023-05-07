using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class TopWorkoutViewModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? WorkoutName { get; set; }
        public string? WorkoutDescription {get; set;}
        public List<string>? Exercises {get;set;}
        public DateTime CreatedAt { get; set; }
        public bool IsPublic { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? CreatedByUsername { get; set; }
        public string? CreatedByPhotoUrl { get; set; }
        public int Likes { get; set; }
    }
}