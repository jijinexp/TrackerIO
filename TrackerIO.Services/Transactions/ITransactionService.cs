namespace TrackerIO.Services.Transactions;

public interface ITransactionService
{
    public ServiceResponse<TransactionResponse> GetRawTransactions(DateRange dateRange);
}