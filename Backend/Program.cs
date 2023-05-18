using Backend.Interfaces;
using Backend.Services;
using Backend.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ServiceDatabaseSettings>(builder.Configuration.GetSection(nameof(ServiceDatabaseSettings)));
builder.Services.AddSingleton<IServiceDatabaseSettings>(sp => sp.GetRequiredService<IOptions<ServiceDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("ServiceDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();
builder.Services.AddScoped<IWorkoutService, WorkoutService>();
builder.Services.AddScoped<IWorkoutLikeService, WorkoutLikeService>();
builder.Services.AddScoped<IWeightService, WeightService>();
builder.Services.AddScoped<IPhotoService, PhotoService>();

builder.Services.Configure<JwtSecret>(builder.Configuration.GetSection("JwtSecret"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigins",
            builder =>
            {
                builder.WithOrigins("https://workoutplanningapplication.netlify.app", "https://www.workoutplanningapplication.netlify.app")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<JwtMiddleware>();
app.Run();
