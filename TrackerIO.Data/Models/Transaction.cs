using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackerIO.Data.Models;

public class Transaction
{
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public required string CsvId { get; set; }
    public required DateOnly Date { get; set; }
    public string? Description { get; set; }
    public required string Type { get; set; }
    public required string Bank { get; set; }
    public decimal Amount { get; set; }
    public UploadFile? File { get; init; }
}