using Backend.Interfaces;
using Backend.Services;
using Backend.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<UserStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(UserStoreDatabaseSettings)));
builder.Services.AddSingleton<IUserStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<UserStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("UserStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.Configure<ExerciseStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(ExerciseStoreDatabaseSettings)));
builder.Services.AddSingleton<IExerciseStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<ExerciseStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("ExerciseStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IExerciseService, ExerciseService>();

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
