using Microsoft.AspNetCore.Mvc;
using TrackerIO.Services;
using TrackerIO.Services.Transactions;
using TrackerIO.Services.Upload;

namespace TrackerIO.API.Controllers;

public class TransactionController : Controller
{
    private readonly IUploadService _uploadService;
    private readonly ITransactionService _transactionService;

    public TransactionController(IUploadService uploadService, ITransactionService transactionService)
    {
        _uploadService = uploadService;
        _transactionService = transactionService;
    }
    
    [HttpPut]
    [Route(ApiRoutes.UploadFile)]
    public IActionResult Upload(IFormFile? file)
    {
        if (file is null || file.Length == 0)
            return NoContent();
        var response = _uploadService.Upload(file);
        if (response.IsSuccess())
            return Ok(response.Message);

        return BadRequest(response.Message);
    }

    [HttpGet]
    [Route(ApiRoutes.Transactions)]
    public IActionResult GetTransactions([FromQuery] DateRange dateRange)
    {
        var response = _transactionService.GetRawTransactions(dateRange);
        if (response.IsSuccess())
            return Ok(response.Content);
        return BadRequest(response.Message); 
    }
}