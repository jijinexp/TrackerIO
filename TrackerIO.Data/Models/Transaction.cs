using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackerIO.Data.Models;

public class Transaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    public required string CsvId { get; set; }
    public required DateOnly Date { get; set; }
    public string? Description { get; set; }
    public required string Type { get; set; }
    public required string Bank { get; set; }
    public decimal Amount { get; set; }
}