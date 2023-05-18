using Backend.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using Backend.Models;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Advanced;

public class PhotoService : IPhotoService
{
    private IMongoClient _client;
    private IMongoDatabase _database;
    private readonly IMongoCollection<ProfilePhoto> _profilePhotos;
    private readonly IMongoCollection<User> _usersCollection;

    public PhotoService(IServiceDatabaseSettings settings, IMongoClient client)
    {
        _client = new MongoClient(settings.ConnectionString);
        _database = _client.GetDatabase(settings.DatabaseName);
        _profilePhotos = _database.GetCollection<ProfilePhoto>("profilePhotos");
        _usersCollection = _database.GetCollection<User>("users");

        // Create unique indexes
        var userIdKey = Builders<ProfilePhoto>.IndexKeys.Ascending(x => x.UserId);
        var uniqueIndexOption = new CreateIndexOptions { Unique = true };
        var userIdIndexModel = new CreateIndexModel<ProfilePhoto>(userIdKey, uniqueIndexOption);
        _profilePhotos.Indexes.CreateOne(userIdIndexModel);
    }

    public async Task AddPhotoAsync(string userId, byte[] data)
    {
        var profilePhoto = new ProfilePhoto
        {
            UserId = userId,
            Data = CompressPhoto(data)
        };
        await _profilePhotos.InsertOneAsync(profilePhoto);
        ProfilePhoto photo = await _profilePhotos.FindAsync(x => x.UserId == userId).Result.FirstOrDefaultAsync();
        var update = Builders<User>.Update.Set(u => u.profile.Avatar ,"https://workoutplanningapplicationbackend.azurewebsites.net/v1/user/profilephoto?id="+photo.Id);
        
        await _usersCollection.UpdateOneAsync(x => x.Id == userId, update);
    }

    public async Task<byte[]> GetPhotoAsync(string Id)
    {
        var profilePhoto = await _profilePhotos.FindAsync(x => x.Id == Id).Result.FirstOrDefaultAsync();
        if (profilePhoto == null)
        {
            throw new Exception("Photo not found");
        }
        var photo = profilePhoto.Data;
        return photo!;
    }

    public async Task UpdatePhotoAsync(string userId, byte[] data, string baseUrl)
    {
        var profilePhoto = await _profilePhotos.FindAsync(x => x.UserId == userId).Result.FirstOrDefaultAsync();
        if (profilePhoto == null)
        {
            await AddPhotoAsync(userId, data);
        }
        else
        {
            var update = Builders<ProfilePhoto>.Update.Set(p => p.Data, CompressPhoto(data));
            await _profilePhotos.UpdateOneAsync(x => x.UserId == userId, update);
        }
    }

    public async Task DeletePhotoAsync(string userId)
    {
        //Change user profile photo to null
        var update = Builders<User>.Update.Set(u => u.profile.Avatar ,null);
        await _usersCollection.UpdateOneAsync(x => x.Id == userId, update);
        //Delete photo from database    
        await _profilePhotos.DeleteOneAsync(x => x.UserId == userId);
    }

    public bool IsImage(IFormFile file)
    {
        if (file == null)
        {
            return false;
        }

        using (var ms = new MemoryStream())
        {
            file.CopyTo(ms);
            var data = ms.ToArray();
            try
            {
                using (var image = Image.Load(data))
                {
                    var format = image?.GetConfiguration()?.ImageFormats?.FirstOrDefault();

                    return format is JpegFormat ||
                           format is PngFormat;
                }
            }
            catch
            {
                return false;
            }
        }
    }

    private byte[] CompressPhoto(byte[] data)
    {
        using (var ms = new MemoryStream(data))
        using (var image = Image.Load(ms))
        {
            IImageEncoder encoder;
            encoder = new JpegEncoder { Quality = 10 };
            var compressedStream = new MemoryStream();
            image!.Save(compressedStream, encoder);
            return compressedStream.ToArray();
        }
    }







}
