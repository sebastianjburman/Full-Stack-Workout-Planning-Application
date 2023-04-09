using Backend.Interfaces;

namespace Backend.Models
{
    public class ServiceDatabaseSettings:IServiceDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}