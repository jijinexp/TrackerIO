using Microsoft.AspNetCore.Http;
using TrackerIO.Data.Models;

namespace TrackerIO.Services.File;

public class UploadFileMetaData
{
    private UploadFile _file { get; set; }
    public UploadFileMetaData(IFormFile? file)
    {
        _file = new UploadFile
        {
            FileName = Path.GetExtension(_file?.FileName),
            FileExtension = Path.GetExtension(_file?.FileName),
            FileSize = file?.Length,
        };
    }
}