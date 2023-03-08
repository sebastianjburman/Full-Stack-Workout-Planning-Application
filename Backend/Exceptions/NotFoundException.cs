namespace Backend.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string notFound) : base($"{notFound} not found")
        {

        }
    }
}