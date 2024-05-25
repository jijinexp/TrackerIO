using Microsoft.EntityFrameworkCore;
using TrackerIO.Data.Models;

namespace TrackerIO.Data;

public class TrackerDataContext : DbContext
{
    public TrackerDataContext(DbContextOptions<TrackerDataContext> options) : base(options)
    { }
    
    public DbSet<Transaction>? Transactions { get; set;}
    public DbSet<UploadFile>? Files { get; set;}
}
