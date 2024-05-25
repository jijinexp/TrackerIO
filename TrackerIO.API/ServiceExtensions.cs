using Microsoft.EntityFrameworkCore;
using TrackerIO.Data;
using TrackerIO.Services.File;
using TrackerIO.Services.Transactions;
using TrackerIO.Services.Upload;
using TrackerIO.Services.Upload.CSV;

namespace TrackerIO.API;

public static class ServiceExtensions
{
    public static void AddTrackerServices(this IServiceCollection services)
    {
        services.AddScoped<IFileService,FileMetaDataService>();
        services.AddScoped<IUploadService,CsvUploadService>();
        services.AddScoped<ITransactionService,TransactionService>();
    }

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("BuckWiseDbConnection");
        builder.Services.AddDbContext<TrackerDataContext>(options =>
            options.UseNpgsql(connectionString ??
                              throw new InvalidOperationException(
                                  $"Connection string for {nameof(TrackerDataContext)} not found."), 
                                  x => x.MigrationsAssembly(typeof(TrackerDataContext).Assembly.FullName) ));
    }
}