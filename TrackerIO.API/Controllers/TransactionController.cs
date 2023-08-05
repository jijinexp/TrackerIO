using Microsoft.AspNetCore.Mvc;
using TrackerIO.Services;
using TrackerIO.Services.Upload;

namespace TrackerIO.API.Controllers;

public class TransactionController : Controller
{
    private readonly IUploadService _uploadService;

    public TransactionController(IUploadService uploadService)
    {
        _uploadService = uploadService;
    }
    
    [HttpPut]
    [Route(ApiRoutes.UploadFile)]
    public async Task<IActionResult> Upload(IFormFile? file)
    {
        if (file is null || file.Length == 0)
            return NoContent();

        using var streamReader = new StreamReader(file.OpenReadStream());
        var response = await _uploadService.Upload(streamReader);
        if (response.Success)
            return Ok(response);

        return BadRequest(response.Message);
    }

    [HttpGet]
    [Route(ApiRoutes.Transactions)]
    public Task<IActionResult> GetTransactions([FromQuery] DateRange dateRange)
    {
        return Task.FromResult<IActionResult>(NoContent());
    }
}