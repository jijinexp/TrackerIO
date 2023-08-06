using Microsoft.AspNetCore.Http;
using TrackerIO.Data.Models;

namespace TrackerIO.Services.File;

public interface IFileService
{
    public byte[] ConvertToBytes(IFormFile? file);
    public void CreateUploadFile(UploadFile record);
}