using TrackerIO.Data.Models;

namespace TrackerIO.Services.File;

public interface IFileService
{
    public byte[] ConvertToBytes(MemoryStream fileStream);
    public void CreateUploadFile(UploadFile record);
}