using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class WeightEntry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("weight")]
        public double Weight { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string? UserId { get; set; }
    }
}