using Microsoft.EntityFrameworkCore;
using TrackerIO.API;
using TrackerIO.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddDatabase();
builder.Services.AddTrackerServices();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        corsPolicyBuilder => corsPolicyBuilder
            .WithOrigins("http://localhost:3000") // Replace with your React app's URL
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<TrackerDataContext>();
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowReactApp");
app.UseCors("AllowReactApp");

app.Run();
