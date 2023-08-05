using System.IO;
using System.Threading.Tasks;

namespace TrackerIO.Services.Upload;


public interface IUploadService
{
    public Task<ContentResponse> Upload(StreamReader streamReader);
}