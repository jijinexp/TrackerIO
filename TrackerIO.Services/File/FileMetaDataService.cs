using Microsoft.AspNetCore.Http;
using TrackerIO.Data;
using TrackerIO.Data.Models;

namespace TrackerIO.Services.File;

public class FileMetaDataService :  IFileService
{
    private readonly TrackerDataContext _context;

    public FileMetaDataService(TrackerDataContext context)
    {
        _context = context;
    }

    public byte[] ConvertToBytes(IFormFile? file)
    {
        using var memoryStream = new MemoryStream();
        file?.CopyTo(memoryStream);
        return memoryStream.ToArray();
    }

    public void CreateUploadFile(UploadFile? record)
    {
        if (record is null) return;
        _context.Files?.Add(record);
        _context.SaveChanges();
    }
}