using System;
using System.Security.Cryptography;
using System.Text;

namespace TrackerIO.Services.Upload.CSV.Mappers;

public class HashIdentifier
{
    private string HashId { get; set; }
    public HashIdentifier(string inputString)
    {
        // Create an instance of the MD5 hashing algorithm
        // Convert the input string to a byte array
        var inputBytes = Encoding.UTF8.GetBytes(inputString);

        // Compute the hash value of the input bytes
        var hashBytes = MD5.HashData(inputBytes);

        // Convert the hash bytes to a hexadecimal string
        var sb = new StringBuilder();
        foreach (var t in hashBytes)
        {
            var el = t.ToString("x2"); // "x2" formats the byte as a hexadecimal string
            sb.Append(el);
        }

        HashId = sb.ToString();
    }

    public string GetId()
    {
        return !string.IsNullOrWhiteSpace(HashId) ? HashId : throw new Exception("Hash Id cannot be null");
    }
}