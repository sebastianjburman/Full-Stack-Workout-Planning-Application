using Backend.Models;
using MongoDB.Driver;
using Backend.Interfaces;

namespace Backend.Services
{
    public class WeightService : IWeightService
    {
        private readonly IMongoCollection<WeightEntry> _weightEntries;
        private readonly IMongoCollection<User> _users;
        public WeightService(IServiceDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _weightEntries = database.GetCollection<WeightEntry>("weightEntries");
            _users = database.GetCollection<User>("users");
        }
        public async Task Create(double weight, string userId)
        {
            //Check if weightEntry was already created today
            DateTime today = DateTime.UtcNow.Date;
            var existingUsersWeightEntries = from l in _weightEntries.AsQueryable()
                                             where l.Date >= today && l.Date < today.AddDays(1) && l.UserId == userId
                                             select l;

            if (existingUsersWeightEntries.FirstOrDefault() != null)
            {
                throw new Exception("Weight entry already created today");
            }
            
            //Create weight entry
            WeightEntry weightEntry = new WeightEntry();
            weightEntry.Weight = weight;
            weightEntry.UserId = userId;
            weightEntry.Date = DateTime.Now;
            await _weightEntries.InsertOneAsync(weightEntry);
        }
        public async Task Delete(string weightEntryId, string userId)
        {
            //Check if user created this weight entry
            WeightEntry weightEntry = await _weightEntries.FindAsync(weightEntry => weightEntry.Id == weightEntryId).Result.FirstOrDefaultAsync();
            if (weightEntry.UserId != userId)
            {
                throw new Exception("User not authorized to delete this weight entry");
            }
            await _weightEntries.DeleteOneAsync(weightEntry => weightEntry.Id == weightEntryId);
        }
        public async Task<List<WeightEntry>> GetRecentMonthWeightEntry(string userId)
        {
            DateTime today = DateTime.UtcNow.Date;
            DateTime monthAgo = today.AddMonths(-1);
            var weightEntries = await _weightEntries.Find(w => w.UserId == userId && w.Date >= monthAgo).ToListAsync();
            return weightEntries;
        }
    }
}