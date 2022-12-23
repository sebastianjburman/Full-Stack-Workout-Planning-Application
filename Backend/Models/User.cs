public class User{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public int CurrentWeight { get; set; }
    public int Height { get; set; }
    public Profile profile { get; set; }
}

public class Profile{
    public string Avatar { get; set; }
    public string Bio { get; set; }
    public List<Workout> Workouts;
}

public class Workout{

} 