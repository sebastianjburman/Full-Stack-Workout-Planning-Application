using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("email")]
        [Required]
        public string Email { get; set; }
        [Required]
        [BsonElement("password")]
        public string Password { get; set; }
        [Required]
        [BsonElement("username")]
        public string UserName { get; set; }
        [Required]
        [BsonElement("firstname")]
        public string FirstName { get; set; }
        [Required]
        [BsonElement("lastname")]
        public string LastName { get; set; }
        [Required]
        [BsonElement("age")]
        public int Age { get; set; }
        [BsonElement("currentweight")]
        [Required]
        public int CurrentWeight { get; set; }
        [Required]
        [BsonElement("height")]
        public int Height { get; set; }
        [Required]
        [BsonElement("profile")]
        public Profile profile { get; set; }
    }

    public class Profile
    {
        [BsonElement("avatar")]
        public string Avatar { get; set; }
        [BsonElement("bio")]
        public string Bio { get; set; }
        [BsonElement("workouts")]
        public List<Workout> Workouts;
    }

    public class Workout
    {

    }
}