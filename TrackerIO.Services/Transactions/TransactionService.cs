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
            .Where(a => a.Date >= dateRange.StartDate && a.Date <= dateRange.EndDate).OrderBy(a => a.Date)
            .ToList();
        var response = new TransactionResponse
        {
            RawTransactions = new List<Transaction>()
        };
        if (transactions is not null) response.RawTransactions.AddRange(transactions);

        return new ServiceResponse<TransactionResponse>().Success(response);
    }

    public ServiceResponse<ExpenseResponse> GetExpense(DateRange dateRange)
    {
        var transactions = _context.Transactions?
            .AsNoTracking()
            .Where(a => (a.Date >= dateRange.StartDate && a.Date <= dateRange.EndDate)
                        && a.Amount < 0).OrderBy(a => a.Date).Select(a => a.Amount)
            .ToList();

        var total = transactions?.Sum(a => a);

        var response = new ExpenseResponse
        {
            Total = total.GetValueOrDefault()
        };

        return new ServiceResponse<ExpenseResponse>().Success(response);
    }

    public ServiceResponse<TransactionService> MergeTransactions(Guid fromId, Guid toId)
    {
        var fromTransaction = _context.Transactions?.FirstOrDefault(x => x.Id == fromId);
        var toTransaction = _context.Transactions?.FirstOrDefault(x => x.Id == toId);
        if (fromTransaction is null || toTransaction is null)
            return new ServiceResponse<TransactionService>().BadRequest($"Invalid merge");
        toTransaction.Date = fromTransaction.Date;
        toTransaction.Amount = fromTransaction.Amount;
        toTransaction.Description = fromTransaction.Description;
        toTransaction.Type = fromTransaction.Type;
        _context.Transactions?.Update(toTransaction);
        _context.Transactions?.Remove(fromTransaction);
        _context.SaveChanges();
        return new ServiceResponse<TransactionService>().Success(
            $"{fromTransaction.Description} merged with {toTransaction.Description}");
    }
}