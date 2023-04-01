using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class WorkoutLike
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("workoutId")]
        public string? WorkoutId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string? UserId { get; set; }
        [BsonElement("lastEdited")]
        public DateTime LastEdited { get; set; }
    }
}