using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using TrackerIO.Data;
using TrackerIO.Services.Upload;
using TrackerIO.Services.Upload.CSV;

namespace TrackerIO.API;

public static class ServiceExtensions
{
    public static void AddTrackerServices(this IServiceCollection services)
    {
        services.AddScoped<IUploadService,CsvUploadService>();
    }

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<TrackerDataContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("TrackerDataContextSQLite") ??
                              throw new InvalidOperationException(
                                  $"Connection string for {nameof(TrackerDataContext)} not found.")));
        
    }
}