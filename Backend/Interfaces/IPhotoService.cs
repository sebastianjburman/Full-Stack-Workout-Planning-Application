public interface IPhotoService
{
    Task AddPhotoAsync(string userId, byte[] data, string baseUrl);
    Task<byte[]> GetPhotoAsync(string Id);
    Task UpdatePhotoAsync(string userId, byte[] data, string baseUrl);
    Task DeletePhotoAsync(string userId);
    bool IsImage(IFormFile file);
}
