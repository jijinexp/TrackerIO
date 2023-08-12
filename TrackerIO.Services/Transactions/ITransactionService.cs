namespace TrackerIO.Services.Transactions;

public interface ITransactionService
{
    public ServiceResponse<TransactionResponse> GetRawTransactions(DateRange dateRange);
    public ServiceResponse<TransactionService> RemoveTransactions(string[] transactionIds);
    public ServiceResponse<TransactionService> MergeTransactions(Guid fromId, Guid toId);
    public ServiceResponse<ExpenseResponse> GetExpense(DateRange dateRange);
}