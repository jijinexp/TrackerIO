using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;

namespace TrackerIO.Services.Upload.CSV.Converters
{
    public class CurrencyConverter : ITypeConverter
    {
        public object? ConvertFromString(string? text, IReaderRow row, MemberMapData memberMapData)
        {
            if (!string.IsNullOrEmpty(text))
            {
                var trimNum = text.Replace(" ","");
                decimal.TryParse(trimNum, NumberStyles.Currency, CultureInfo.CreateSpecificCulture("en-NZ").NumberFormat, out decimal num);
                return num;
            }
            return null;

        }

        public string? ConvertToString(object? value, IWriterRow row, MemberMapData memberMapData)
        {
            throw new NotImplementedException();
        }
    }
}