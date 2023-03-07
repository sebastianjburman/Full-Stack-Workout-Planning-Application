using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Exercise
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    [RegularExpression(@"^[a-zA-Z''-'\s]{5,30}$", ErrorMessage = "Workout is not in correct format. Min 5 characters and max 30 characters.")]
    public string? Name { get; set; }
    [RegularExpression(@"^[a-zA-Z''-'\s]{10,30}$", ErrorMessage = "Description is not in correct format. Min 10 characters and max 100 characters.")]
    [BsonElement("description")]
    public string? Description { get; set; }

    [BsonElement("sets")]
    [Range(1, 5, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public int Sets { get; set; }

    [BsonElement("reps")]
    [Range(1, 30, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public int Reps { get; set; }

    [BsonElement("related_links")]
    public string[]? RelatedLinks { get; set; }

    [BsonElement("created_by")]
    public string? CreatedBy { get; set; }
}





