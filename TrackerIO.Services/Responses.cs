using TrackerIO.Data.Models;

namespace TrackerIO.Services;

public class TransactionResponse
{
    public List<Transaction> RawTransactions { get; init; }
}

public class ExpenseResponse
{
    public decimal Total { get; init; }
}