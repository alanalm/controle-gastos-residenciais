using ControleGastosResidenciais.API.Data;
using ControleGastosResidenciais.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.API.Servicos
{
    public class PessoaService
    {
        private readonly ControleGastosDbContext _context;

        public PessoaService(ControleGastosDbContext context)
        {
            _context = context;
        }

        // Retorna todas as pessoas cadastradas
        public async Task<List<Pessoa>> ObterTodasAsync()
        {
            return await _context.Pessoas
                .OrderBy(p => p.Nome)
                .ToListAsync();
        }

        // Retorna uma pessoa por ID
        public async Task<Pessoa?> ObterPorIdAsync(int id)
        {
            return await _context.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        // Cria uma nova pessoa
        public async Task<Pessoa> CriarAsync(Pessoa pessoa)
        {
            // Validações
            if (string.IsNullOrWhiteSpace(pessoa.Nome))
                throw new ArgumentException("Nome é obrigatório");

            if (pessoa.Idade < 0 || pessoa.Idade > 116)
                throw new ArgumentException("Idade deve estar entre 0 e 116");

            pessoa.DataCriacao = DateTime.UtcNow;

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return pessoa;
        }

        // Deleta uma pessoa e todas suas transações (cascade)
        public async Task<bool> DeletarAsync(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
                return false;

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return true;
        }

        // Verifica se uma pessoa existe
        public async Task<bool> ExisteAsync(int id)
        {
            return await _context.Pessoas.AnyAsync(p => p.Id == id);
        }
    }
}
