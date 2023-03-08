namespace Backend.Exceptions
{
    public class InvalidAccessException : Exception
    {
        public InvalidAccessException(string type) : base($"You do not have permission to {type} this.")
        {

        }
    }
}