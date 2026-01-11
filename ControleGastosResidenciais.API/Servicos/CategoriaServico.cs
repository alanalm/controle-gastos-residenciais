using ControleGastosResidenciais.API.Data;
using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.API.Servicos
{
    public class CategoriaServico
    {
        private readonly ControleGastosDbContext _context;

        public CategoriaServico(ControleGastosDbContext context)
        {
            _context = context;
        }

        // Retorna todas as categorias cadastradas
        public async Task<List<Categoria>> ObterTodasAsync()
        {
            return await _context.Categorias
                .OrderBy(c => c.Descricao)
                .ToListAsync();
        }

        // Retorna uma categoria por ID
        public async Task<Categoria?> ObterPorIdAsync(int id)
        {
            return await _context.Categorias
                .Include(c => c.Transacoes)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        // Cria uma nova categoria
        // Centraliza regras de negócio para criação de categorias
        public async Task<Categoria> CriarAsync(Categoria categoria)
        {
            // Validações
            if (string.IsNullOrWhiteSpace(categoria.Descricao))
                throw new ArgumentException("Descrição é obrigatória");

            // Verifica se já existe categoria com mesma descrição
            var existe = await _context.Categorias
                .AnyAsync(c => c.Descricao.ToLower() == categoria.Descricao.ToLower());

            if (existe)
                throw new InvalidOperationException("Já existe uma categoria com essa descrição");

            categoria.DataCriacao = DateTime.UtcNow;

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return categoria;
        }

        // Verifica se uma categoria existe
        public async Task<bool> ExisteAsync(int id)
        {
            return await _context.Categorias.AnyAsync(c => c.Id == id);
        }

        // Verifica se a categoria pode ser usada para o tipo de transação
        public bool PodeSerUsadaPara(Categoria categoria, TipoTransacao tipo)
        {
            return categoria.Finalidade switch
            {
                FinalidadeCategoria.Ambas => true,
                FinalidadeCategoria.Despesa => tipo == TipoTransacao.Despesa,
                FinalidadeCategoria.Receita => tipo == TipoTransacao.Receita,
                _ => false
            };
        }
    }
}
