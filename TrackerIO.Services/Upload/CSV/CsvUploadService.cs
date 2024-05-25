using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using TrackerIO.Data;
using TrackerIO.Data.Models;
using TrackerIO.Services.File;
using TrackerIO.Services.Upload.CSV.Mappers;
using TrackerIO.Services.Upload.CSV.Models;

namespace TrackerIO.Services.Upload.CSV;

public class CsvUploadService : IUploadService
{
    private readonly TrackerDataContext _context;
    private readonly IFileService _fileService;

    public CsvUploadService(TrackerDataContext context, IFileService fileService)
    {
        _context = context;
        _fileService = fileService;
    }
    public ServiceResponse<CsvUploadService> Upload(string? fileName,MemoryStream file)
    {
        var recordCount = 0;
        try
        {
            var csvBytes = _fileService.ConvertToBytes(file);

            var toUploadFile = new UploadFile
            {
                FileName = Path.GetFileName(fileName),
                FileExtension = Path.GetExtension(fileName),
                FileSize = file?.Length,
                UploadTime = DateTime.UtcNow.ToUniversalTime()
            };

            if (toUploadFile.FileExtension is null or not ".csv")
            {
                return new ServiceResponse<CsvUploadService>()
                    .BadRequest($"Unsupported file format {toUploadFile.FileExtension}. Please upload a CSV file");
            }
            
            
            _fileService.CreateUploadFile(toUploadFile);
            
            using var memoryStream = new MemoryStream(csvBytes);
            using var streamReader = new StreamReader(memoryStream);
            using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            csvReader.Read();
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
                var dbRecord = _context.Transactions?
                    .FirstOrDefault(a => a.CsvId == csvRecord.TransactionId);
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
                    Description = variableCsvRecord.TransactionName,
                    Type = variableCsvRecord.Type,
                    Bank = variableCsvRecord.Bank,
                    Amount = variableCsvRecord.Amount,
                    File = toUploadFile
                };
                transactions.Add(transaction);
            }
            _context.Transactions?.AddRange(transactions);
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return new ServiceResponse<CsvUploadService>()
            .Success($"File processed successfully with {recordCount} records");
    }
}