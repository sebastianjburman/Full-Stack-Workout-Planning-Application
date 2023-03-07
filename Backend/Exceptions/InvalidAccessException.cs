namespace Backend.Exceptions
{
    public class InvalidAccessException : Exception
    {
        public InvalidAccessException() : base("You do not have permission to view this.")
        {

        }
    }
}