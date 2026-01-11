using ControleGastosResidenciais.API.Data;
using ControleGastosResidenciais.API.Servicos;
using Microsoft.EntityFrameworkCore;

SQLitePCL.Batteries.Init();

var builder = WebApplication.CreateBuilder(args);

// DbContext com SQLite
builder.Services.AddDbContext<ControleGastosDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

//Servicos
builder.Services.AddScoped<PessoaServico>();
builder.Services.AddScoped<CategoriaServico>();
builder.Services.AddScoped<TransacaoServico>();

// Controllers
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS para o front-end React poder acessar
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins("https://localhost:63374")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Criar banco automaticamente
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ControleGastosDbContext>();
    db.Database.EnsureCreated();
}

// Configurar pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();

app.Run();