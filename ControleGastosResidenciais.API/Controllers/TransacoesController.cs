using ControleGastosResidenciais.API.DTOs;
using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoServico _transacaoServico;

        public TransacoesController(TransacaoServico transacaoServico)
        {
            _transacaoServico = transacaoServico;
        }

        // Retorna todas as transações cadastradas
        [HttpGet]
        public async Task<ActionResult<List<TransacaoDto>>> ObterTodos()
        {
            try
            {
                var transacoes = await _transacaoServico.ObterTodasAsync();
                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar transações", error = ex.Message });
            }
        }

        // Retorna uma transação específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> ObterPorId(int id)
        {
            try
            {
                var transacao = await _transacaoServico.ObterPorIdAsync(id);

                if (transacao == null)
                    return NotFound(new { message = "Transação não encontrada" });

                return Ok(transacao);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar transação", error = ex.Message });
            }
        }

        // Retorna todas as transações de uma pessoa específica
        [HttpGet("pessoa/{pessoaId}")]
        public async Task<ActionResult<List<Transacao>>> ObterPorPessoa(int pessoaId)
        {
            try
            {
                var transacoes = await _transacaoServico.ObterPorPessoaAsync(pessoaId);
                if (!transacoes.Any())
                    return NotFound(new { message = "Pessoa não encontrada ou sem transações" });
                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar transações", error = ex.Message });
            }
        }

        // Cria uma nova transação 
        [HttpPost]
        public async Task<ActionResult<Transacao>> Criar(CriarTransacaoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var transacao = new Transacao
                {
                    Descricao = dto.Descricao,
                    Valor = dto.Valor,
                    Tipo = dto.Tipo,
                    PessoaId = dto.PessoaId,
                    CategoriaId = dto.CategoriaId,
                    DataTransacao = dto.DataTransacao
                };

                var criada = await _transacaoServico.CriarAsync(transacao);

                return CreatedAtAction(nameof(ObterPorId), new { id = criada.Id }, criada);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
