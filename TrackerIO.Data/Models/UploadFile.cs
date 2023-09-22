using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrackerIO.Data.Models;

public class UploadFile
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    
    public string? FileName { get; set; }
    
    public string? FileExtension { get; set; }
    
    public long? FileSize { get; set; }
    
    public required byte[] FileContent { get; set; }
    public DateTime UploadTime => DateTime.Now;
}