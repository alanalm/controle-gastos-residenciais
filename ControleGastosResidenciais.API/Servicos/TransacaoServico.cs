using ControleGastosResidenciais.API.Data;
using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.API.Servicos
{
    public class TransacaoService
    {
        private readonly ControleGastosDbContext _context;

        public TransacaoService(ControleGastosDbContext context)
        {
            _context = context;
        }

        // Retorna todas as transações com pessoa e categoria
        public async Task<List<Transacao>> ObterTodasAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .OrderByDescending(t => t.DataTransacao)
                .ToListAsync();
        }

        // Retorna uma transação por ID
        public async Task<Transacao?> ObterPorIdAsync(int id)
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        // Retorna transações de uma pessoa específica
        public async Task<List<Transacao>> ObterPorPessoaAsync(int pessoaId)
        {
            return await _context.Transacoes
                .Include(t => t.Categoria)
                .Where(t => t.PessoaId == pessoaId)
                .OrderByDescending(t => t.DataTransacao)
                .ToListAsync();
        }

        // Cria uma nova transação com validações de negócio
        public async Task<Transacao> CriarAsync(Transacao transacao)
        {
            // Validações básicas
            if (string.IsNullOrWhiteSpace(transacao.Descricao))
                throw new ArgumentException("Descrição é obrigatória");

            if (transacao.Valor <= 0)
                throw new ArgumentException("Valor deve ser maior que zero");

            // Verifica se pessoa existe
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            if (pessoa == null)
                throw new ArgumentException("Pessoa não encontrada");

            // Verifica se categoria existe
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
            if (categoria == null)
                throw new ArgumentException("Categoria não encontrada");

            // REGRA DE NEGÓCIO 1: Menor de idade só pode ter DESPESAS
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException("Menores de idade só podem ter despesas");

            // REGRA DE NEGÓCIO 2: Categoria deve ser compatível com o tipo
            var categoriaCompativel = categoria.Finalidade switch
            {
                FinalidadeCategoria.Ambas => true,
                FinalidadeCategoria.Despesa => transacao.Tipo == TipoTransacao.Despesa,
                FinalidadeCategoria.Receita => transacao.Tipo == TipoTransacao.Receita,
                _ => false
            };

            if (!categoriaCompativel)
            {
                var mensagem = transacao.Tipo == TipoTransacao.Despesa
                    ? "Esta categoria não pode ser usada para despesas"
                    : "Esta categoria não pode ser usada para receitas";
                throw new InvalidOperationException(mensagem);
            }

            transacao.DataCriacao = DateTime.UtcNow;

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return transacao;
        }

        // Verifica se uma transação existe
        public async Task<bool> ExisteAsync(int id)
        {
            return await _context.Transacoes.AnyAsync(t => t.Id == id);
        }
    }
}
