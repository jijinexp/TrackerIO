using System;
using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;

namespace TrackerIO.Services.Upload.CSV.Converters;

public class DateOnlyConverter : ITypeConverter
{
    private readonly string _dateFormat;

    public DateOnlyConverter(string dateFormat)
    {
        _dateFormat = dateFormat;
    }
    public object? ConvertFromString(string? text, IReaderRow row, MemberMapData memberMapData)
    {
        if (!string.IsNullOrEmpty(text))
        {
            DateOnly.TryParseExact(text, _dateFormat,
                                   CultureInfo.InvariantCulture,
                                   DateTimeStyles.None,
                                   out DateOnly date);
            return date;

        }

        return null;
    }

    public string? ConvertToString(object? value, IWriterRow row, MemberMapData memberMapData)
    {
        if (value == null) return string.Empty;
        if (DateOnly.TryParse(value.ToString(), out DateOnly date))
            return date.ToString(_dateFormat);
        else
            return string.Empty;
    }
}