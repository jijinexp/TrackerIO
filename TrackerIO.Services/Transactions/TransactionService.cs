using Microsoft.EntityFrameworkCore;
using TrackerIO.Data;
using TrackerIO.Data.Models;

namespace TrackerIO.Services.Transactions;

public class TransactionService : ITransactionService
{
    private readonly TrackerDataContext _context;

    public TransactionService(TrackerDataContext context)
    {
        _context = context;
    }
    
    public ServiceResponse<TransactionResponse> GetRawTransactions(DateRange dateRange)
    {
        var transactions = _context.Transactions?
            .AsNoTracking()
            .Where(a => a.Date >= dateRange.StartDate && a.Date <= dateRange.EndDate).ToList();
        var response = new TransactionResponse
        {
            RawTransactions = new List<Transaction>() 
        };
        if (transactions is not null) response.RawTransactions.AddRange(transactions);
        return new ServiceResponse<TransactionResponse>().Success(response);
    }
}