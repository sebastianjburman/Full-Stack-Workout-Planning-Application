using Backend.Interfaces;
using Backend.Services;
using Backend.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

//Users
builder.Services.Configure<UserStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(UserStoreDatabaseSettings)));
builder.Services.AddSingleton<IUserStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<UserStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("UserStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IUserService, UserService>();

//Exercises
builder.Services.Configure<ExerciseStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(ExerciseStoreDatabaseSettings)));
builder.Services.AddSingleton<IExerciseStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<ExerciseStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("ExerciseStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IExerciseService, ExerciseService>();

//Workouts
builder.Services.Configure<WorkoutStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(WorkoutStoreDatabaseSettings)));
builder.Services.AddSingleton<IWorkoutStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<WorkoutStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("WorkoutStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IWorkoutService, WorkoutService>();

//WorkoutLikes
builder.Services.Configure<WorkoutLikeStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(WorkoutLikeStoreDatabaseSettings)));
builder.Services.AddSingleton<IWorkoutLikeStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<WorkoutLikeStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("WorkoutLikeStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IWorkoutLikeService, WorkoutLikeService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


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
