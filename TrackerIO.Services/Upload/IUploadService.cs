using TrackerIO.Services.Upload.CSV;

namespace TrackerIO.Services.Upload;


public interface IUploadService
{
    public ServiceResponse<CsvUploadService> Upload(string? fileName,MemoryStream fileStream);
}