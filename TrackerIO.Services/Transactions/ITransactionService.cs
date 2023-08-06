namespace TrackerIO.Services.Transactions;

public interface ITransactionService
{
    public ServiceResponse<TransactionResponse> GetRawTransactions(DateRange dateRange);
    public ServiceResponse<TransactionService> MergeTransactions(Guid fromId, Guid toId);
}