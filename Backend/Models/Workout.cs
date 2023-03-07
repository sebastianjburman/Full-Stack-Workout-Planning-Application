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
        [BsonElement("exercises")]
        public List<Exercise> Exercises = new List<Exercise>();
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        [BsonElement("createdBy")]
        public string? CreatedBy { get; set; }
        [BsonElement("isPublic")]
        public bool isPublic { get; set; }
        public Workout(List<Exercise> exercises)
        {
            if (exercises.Count > 12)
                throw new ArgumentException("A workout cannot contain more than 12 exercises.");

            this.Exercises = exercises;
        }
        public void AddExercise(Exercise exercise)
        {
            if (Exercises.Count >= 12)
                throw new Exception("Cannot add more than 12 exercises to workout.");

            Exercises.Add(exercise);
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