using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class Workout
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("workoutName")]
        [RegularExpression(@"^[a-zA-Z''-'\s]{5,30}$", ErrorMessage = "Name is not in correct format. Min 5 characters and max 30 characters.")]
        public string? WorkoutName { get; set; }
        [BsonElement("workoutDescription")]
        [RegularExpression(@"[a-zA-Z''-''.','\s]{10,400}$", ErrorMessage = "Description is not in correct format. Min 10 characters and max 400 characters.")]
        public string? workoutDescription {get; set;}
        [BsonElement("exercises")]
        public List<string> Exercises {get;set;}
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        [BsonElement("createdBy")]
        public string? CreatedBy { get; set; }
        [BsonElement("isPublic")]
        public bool isPublic { get; set; }
        public Workout()
        {
            Exercises = new List<string>();
        }
        public void AddExercise(string exerciseId)
        {
            if (Exercises.Count >= 15)
                throw new Exception("Cannot add more than 15 exercises to workout.");

            Exercises.Add(exerciseId);
        }
        public void RemoveExercise(int indexOfDeletedExercise)
        {
            if (Exercises.ElementAt(indexOfDeletedExercise) != null)
            {
                Exercises.RemoveAt(indexOfDeletedExercise);
            }
            else
            {
                throw new ArgumentException($"Exercise at index {indexOfDeletedExercise} was not found in workout");
            }
        }
    }
}