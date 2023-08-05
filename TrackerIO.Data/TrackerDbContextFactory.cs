using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TrackerIO.Data;

public class TrackerDbContextFactory : IDesignTimeDbContextFactory<TrackerDataContext>
{
    public TrackerDataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TrackerDataContext>();

        var connectionString = "Data Source=TrackerIO.db";

        optionsBuilder.UseSqlite(connectionString);

        return new TrackerDataContext(optionsBuilder.Options);
    }
}