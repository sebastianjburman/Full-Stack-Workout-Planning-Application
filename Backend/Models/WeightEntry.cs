using System.ComponentModel.DataAnnotations;
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
        [Range(10, 1000, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public System.Double Weight { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string? UserId { get; set; }
    }
}