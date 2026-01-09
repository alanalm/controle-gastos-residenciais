using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.API.Data
{
    // Contexto do banco de dados usando Entity Framework Core
    // Gerencia todas as entidades e relacionamentos do sistema
    public class ControleGastosDbContext : DbContext
    {
        public ControleGastosDbContext(DbContextOptions<ControleGastosDbContext> options)
            : base(options)
        {
        }

        // Tabela de Pessoas
        public DbSet<Pessoa> Pessoas { get; set; } = null!;

        // Tabela de Categorias
        public DbSet<Categoria> Categorias { get; set; } = null!;

        // Tabela de Transações
        public DbSet<Transacao> Transacoes { get; set; } = null!;

        // Configuração avançada dos modelos e relacionamentos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade Pessoa
            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Nome).IsRequired().HasMaxLength(100);
                entity.Property(p => p.Idade).IsRequired();
                entity.HasIndex(p => p.Nome); // Índice para busca por nome
            });

            // Configuração da entidade Categoria
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Descricao).IsRequired().HasMaxLength(100);
                entity.Property(c => c.Finalidade)
                      .IsRequired()
                      .HasConversion<int>(); // Armazena enum como inteiro
                entity.HasIndex(c => c.Descricao).IsUnique(); // Garante descrições únicas
            });

            // Configuração da entidade Transacao
            modelBuilder.Entity<Transacao>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Descricao).IsRequired().HasMaxLength(150);
                entity.Property(t => t.Valor)
                      .IsRequired()
                      .HasColumnType("decimal(18,2)"); // Precisão para valores monetários
                entity.Property(t => t.Tipo)
                      .IsRequired()
                      .HasConversion<int>(); // Armazena enum como inteiro

                // Relacionamento com Pessoa (1:N)
                // Cascade Delete: ao deletar uma pessoa, todas suas transações são deletadas
                entity.HasOne(t => t.Pessoa)
                      .WithMany(p => p.Transacoes)
                      .HasForeignKey(t => t.PessoaId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Relacionamento com Categoria (1:N)
                // Restrict: não permite deletar categoria que tem transações
                entity.HasOne(t => t.Categoria)
                      .WithMany(c => c.Transacoes)
                      .HasForeignKey(t => t.CategoriaId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Índices para melhorar performance de consultas
                entity.HasIndex(t => t.PessoaId);
                entity.HasIndex(t => t.CategoriaId);
                entity.HasIndex(t => t.DataTransacao);
                entity.HasIndex(t => t.Tipo);
            });

            DadosPadrao(modelBuilder);
        }

        // Insere dados iniciais no banco para facilitar testes
        private void DadosPadrao(ModelBuilder modelBuilder)
        {
            // Categorias padrão
            modelBuilder.Entity<Categoria>().HasData(
                new
                {
                    Id = 1,
                    Descricao = "Alimentação",
                    Finalidade = FinalidadeCategoria.Despesa,
                    DataCriacao = new DateTime(2026, 01, 01)
                },
                new 
                {
                    Id = 2,
                    Descricao = "Transporte",
                    Finalidade = FinalidadeCategoria.Despesa,
                    DataCriacao = new DateTime(2026, 01, 01)
                },
                new
                {
                    Id = 3,
                    Descricao = "Salário",
                    Finalidade = FinalidadeCategoria.Receita,
                    DataCriacao = new DateTime(2026, 01, 01)
                },
                new
                {
                    Id = 4,
                    Descricao = "Investimentos",
                    Finalidade = FinalidadeCategoria.Ambas,
                    DataCriacao = new DateTime(2026, 01, 01)
                }
            );
        }
    }
}
