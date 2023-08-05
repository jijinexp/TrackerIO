using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using TrackerIO.Data;
using TrackerIO.Data.Models;
using TrackerIO.Services.Upload.CSV.Mappers;
using TrackerIO.Services.Upload.CSV.Models;

namespace TrackerIO.Services.Upload.CSV;

public class CsvUploadService : IUploadService
{
    private readonly TrackerDataContext _context;

    public CsvUploadService(TrackerDataContext context)
    {
        _context = context;
    }
    public async Task<ContentResponse> Upload(StreamReader streamReader)
    {
        var recordCount = 0;
        try
        {
            using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            await csvReader.ReadAsync();
            csvReader.ReadHeader();
            var headerRecord = string.Join(",",csvReader.HeaderRecord!);
            ClassMap? selectedMap = string.IsNullOrEmpty(headerRecord) switch
            {
                false when headerRecord.StartsWith(AsbMapper.Header) => new AsbMapper(),
                false when headerRecord.StartsWith(AnzMapper.Header) => new AnzMapper(),
                _ => throw new Exception("CSV Mapper not found!!")
            };
            csvReader.Context.RegisterClassMap(selectedMap);
            var csvRecords = csvReader.GetRecords<CsvTransaction>().ToList();
            
            var duplicates = new List<CsvTransaction>();
            for (var index = 0; index < csvRecords.Count; index++)
            {
                var csvRecord = csvRecords[index];
                var dbRecord = _context.Transactions?.FirstOrDefault(a => a.CsvId == csvRecord.TransactionId);
                if (dbRecord is not null)
                    duplicates.Add(csvRecord);
            }

            csvRecords.RemoveAll(a => duplicates.Contains(a));
            recordCount = csvRecords.Count;

            var transactions = new List<Transaction>();
            foreach (var variableCsvRecord in csvRecords)
            {
                var transaction = new Transaction
                {
                    CsvId = variableCsvRecord.TransactionId,
                    Date = variableCsvRecord.Date,
                    Description = variableCsvRecord.Description,
                    Type = variableCsvRecord.Type,
                    Bank = variableCsvRecord.Bank,
                    Amount = variableCsvRecord.Amount
                };
                transactions.Add(transaction);
            }
            _context.Transactions?.AddRange(transactions);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        return new ContentResponse
        {
            Success = true,
            Message = $"File processed successfully with {recordCount} records"
        };
    }
}