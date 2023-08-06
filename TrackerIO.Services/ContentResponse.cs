using static System.Net.HttpStatusCode;

namespace TrackerIO.Services;
public class ContentResponse<TContent>
{
    protected Result  Status { get; init; }
    public string? Message { get; init; }
    public TContent? Content { get; set; }

    public bool IsSuccess()
    {
        return Status == Result.SuccessStatus;
    }
}

public class ServiceResponse<TContent> : ContentResponse<TContent>
{
    public ServiceResponse<TContent> Success(TContent content) =>
        new()
        {
            Status = Result.SuccessStatus,
            Content = content
        };
    public ServiceResponse<TContent> Success(string message) =>
        new()
        {
            Status = Result.SuccessStatus,
            Message = message
        };
    public ServiceResponse<TContent> BadRequest(string message) =>
        new()
        {
            Status = Result.SuccessStatus,
            Message = message
        };
}



public enum Result
{
    SuccessStatus = OK,
    NotFoundStatus = NotFound,
    BadRequestStatus = BadRequest,
    InternalServerErrorStatus = InternalServerError,
    NoContentStatus = NoContent
}