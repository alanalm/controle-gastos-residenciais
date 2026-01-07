using ControleGastosResidenciais.API.Data;
using ControleGastosResidenciais.API.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly ControleGastosDbContext _context;

        public RelatoriosController(ControleGastosDbContext context)
        {
            _context = context;
        }

        // Retorna totais por pessoa (receitas, despesas e saldo)
        [HttpGet("totais-por-pessoa")]
        public async Task<ActionResult> GetTotaisPorPessoa()
        {
            try
            {
                var pessoas = await _context.Pessoas
                    .Include(p => p.Transacoes)
                    .ToListAsync();

                var relatorio = pessoas.Select(p => new
                {
                    p.Id,
                    p.Nome,
                    p.Idade,
                    TotalReceitas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor),
                    TotalDespesas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor),
                    Saldo = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor) -
                        p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor)
                }).ToList();

                var totalGeral = new
                {
                    TotalReceitas = relatorio.Sum(r => r.TotalReceitas),
                    TotalDespesas = relatorio.Sum(r => r.TotalDespesas),
                    SaldoLiquido = relatorio.Sum(r => r.Saldo)
                };

                return Ok(new
                {
                    Pessoas = relatorio,
                    TotalGeral = totalGeral
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao gerar relatório", error = ex.Message });
            }
        }

        // Retorna totais por categoria (receitas, despesas e saldo)
        [HttpGet("totais-por-categoria")]
        public async Task<ActionResult> GetTotaisPorCategoria()
        {
            try
            {
                var categorias = await _context.Categorias
                    .Include(c => c.Transacoes)
                    .ToListAsync();

                var relatorio = categorias.Select(c => new
                {
                    c.Id,
                    c.Descricao,
                    c.Finalidade,
                    TotalReceitas = c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor),
                    TotalDespesas = c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor),
                    Saldo = c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor) -
                        c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor)
                }).ToList();

                var totalGeral = new
                {
                    TotalReceitas = relatorio.Sum(r => r.TotalReceitas),
                    TotalDespesas = relatorio.Sum(r => r.TotalDespesas),
                    SaldoLiquido = relatorio.Sum(r => r.Saldo)
                };

                return Ok(new
                {
                    Categorias = relatorio,
                    TotalGeral = totalGeral
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao gerar relatório", error = ex.Message });
            }
        }
    }
}
