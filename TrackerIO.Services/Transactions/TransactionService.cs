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
            .Where(a => (a.Date >= dateRange.StartDate && a.Date <= dateRange.EndDate))
            .OrderBy(a => a.Date)
            .ToList();

        var totalExpenses = transactions?
            .Where(a => a.Amount < 0)
            .Sum(a => a.Amount);

        var totalEarnings = transactions?
            .Where(a => a.Amount > 0)
            .Sum(a => a.Amount);

        var response = new ExpenseResponse
        {
            ExpenseTotal = totalExpenses.GetValueOrDefault(),
            EarningsTotal = totalEarnings.GetValueOrDefault()
        };

        return new ServiceResponse<ExpenseResponse>().Success(response);
    }

    public ServiceResponse<TransactionService> RemoveTransactions(string[] transactionIds)
    {
        if (transactionIds.Length == 0) return new ServiceResponse<TransactionService>().BadRequest("No ids provided");
        transactionIds = transactionIds.Select(s => s.ToUpper()).ToArray();
        
        var transactions = _context.Transactions?
            .Where(a => !string.IsNullOrWhiteSpace(a.Id.ToString()) && transactionIds.Contains(a.Id.ToString().ToUpper())).ToList();
        
        if (transactions is null) return new ServiceResponse<TransactionService>().Success("Removed no records");
            
        _context.Transactions?.RemoveRange(transactions);
        _context.SaveChanges();
        return new ServiceResponse<TransactionService>().Success("Removed");

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