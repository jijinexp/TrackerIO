using System;
using CsvHelper.Configuration.Attributes;

namespace TrackerIO.Services.Upload.CSV.Models;

public class CsvTransaction
{
    private const string TranId = "TransactionId";
    
    [Name(TranId)]
    public required string TransactionId { get; set; }
    [Name("Date")]
    public required DateOnly Date { get; set; }
    [Name("Particulars")]
    public required string TransactionName { get; set;}
    [Name("Payee")]
    public string? Payee { get; set; }
    [Name("Type")]
    public required string Type { get; set; }
    public required string Bank { get; set; }
    [Name("Amount")]
    public decimal Amount { get; set; }
}