using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class ExerciseViewModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public string? CreatedByUsername { get; set; }
        public string? CreatedByPhotoUrl { get; set; }
    }
}