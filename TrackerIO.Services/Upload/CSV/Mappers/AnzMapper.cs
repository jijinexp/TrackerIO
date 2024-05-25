using CsvHelper.Configuration;
using TrackerIO.Services.Upload.CSV.Models;
using TrackerIO.Services.Upload.CSV.Converters;

namespace TrackerIO.Services.Upload.CSV.Mappers;

public sealed class AnzMapper : ClassMap<CsvTransaction>
{
    public const string Header = "Type,Details,Particulars,Code"; 
    public AnzMapper()
    {
        Map(m => m.TransactionName).Name("Particulars");
        Map(m => m.TransactionId).Convert(x => 
            "Csv-" + new HashIdentifier(
                x.Row.GetField<string>("Date") + 
                x.Row.GetField<string>("Type") +
                x.Row.GetField<string>("Amount") +
                x.Row.GetField<string>("Particulars") + 
                x.Row.GetField<string>("Details")).GetId());
        Map(m => m.Type).Name("Type");
        Map(m => m.Payee).Name("Details");
        Map(m => m.Date).TypeConverter(new DateOnlyConverter("dd/MM/yyyy")).Name("Date");
        Map(m => m.Amount).TypeConverter(new CurrencyConverter()).Name("Amount");
        Map(m => m.Bank).Default("ANZ").Optional();
    }
}