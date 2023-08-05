using CsvHelper.Configuration;
using TrackerIO.Services.Upload.CSV.Models;
using TrackerIO.Services.Upload.CSV.Converters;

namespace TrackerIO.Services.Upload.CSV.Mappers;

public sealed class AsbMapper : ClassMap<CsvTransaction>
{
    public const string Header = "Date,Unique Id,Tran Type"; 
    
    public AsbMapper()
    {
        Map(m => m.TransactionName).Name("Payee");
        Map(m => m.TransactionId).Convert( x =>
            "Csv-" + new HashIdentifier(
                x.Row.GetField<string>("Unique Id") +
                x.Row.GetField<string>("Date") + 
                x.Row.GetField<string>("Tran Type") +
                x.Row.GetField<string>("Amount") +
                x.Row.GetField<string>("Memo") + 
                x.Row.GetField<string>("Payee")).GetId());
        Map(m => m.Type).Name("Tran Type");
        Map(m => m.Description).Name("Memo");
        Map(m => m.Date).TypeConverter(new DateOnlyConverter("yyyy/MM/dd")).Name("Date");
        Map(m => m.Amount).Name("Amount");
        Map(m => m.Bank).Default("ASB").Optional();
    }
}