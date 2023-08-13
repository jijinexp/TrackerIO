using TrackerIO.Data.Models;

namespace TrackerIO.Services;

public class TransactionResponse
{
    public List<Transaction> RawTransactions { get; init; }
}

public class ExpenseResponse
{
    public decimal FixedTotal { get; init; }
    
    public decimal VariableTotal { get; init; }
    public decimal ExpenseTotal { get; init; }
    public decimal EarningsTotal { get; init; }
}