using Backend.Models;

namespace Backend.Interfaces
{
    public interface IWeightService
    {
        Task Create(double weightEntry,string userId);
        Task<List<WeightEntry>> GetRecentMonthWeightEntry(string userId);
        Task Delete(string weightEntryId, string userId);
    }
}