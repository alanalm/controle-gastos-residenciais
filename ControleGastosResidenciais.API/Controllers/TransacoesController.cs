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
        private readonly TransacaoService _transacaoService;

        public TransacoesController(TransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        // Retorna todas as transações cadastradas
        [HttpGet]
        public async Task<ActionResult<List<Transacao>>> GetAll()
        {
            try
            {
                var transacoes = await _transacaoService.ObterTodasAsync();
                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar transações", error = ex.Message });
            }
        }

        // Retorna uma transação específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> GetById(int id)
        {
            try
            {
                var transacao = await _transacaoService.ObterPorIdAsync(id);

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
        public async Task<ActionResult<List<Transacao>>> GetByPessoa(int pessoaId)
        {
            try
            {
                var transacoes = await _transacaoService.ObterPorPessoaAsync(pessoaId);
                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar transações", error = ex.Message });
            }
        }

        // Cria uma nova transação 
        [HttpPost]
        public async Task<ActionResult<Transacao>> Create(CriarTransacaoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId,
                DataTransacao = dto.DataTransacao
            };

            var criada = await _transacaoService.CriarAsync(transacao);

            return CreatedAtAction(nameof(GetById), new { id = criada.Id }, criada);
        }
    }
}
