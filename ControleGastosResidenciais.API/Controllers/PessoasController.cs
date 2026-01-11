using ControleGastosResidenciais.API.DTOs;
using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaServico _pessoaServico;

        public PessoasController(PessoaServico pessoaService)
        {
            _pessoaServico = pessoaService;
        }

        // Retorna todas as pessoas cadastradas
        [HttpGet]
        public async Task<ActionResult<List<Pessoa>>> ObterTodos()
        {
            try
            {
                var pessoas = await _pessoaServico.ObterTodasAsync();
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar pessoas", error = ex.Message });
            }
        }

        // Retorna uma pessoa específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> ObterPorId(int id)
        {
            try
            {
                var pessoa = await _pessoaServico.ObterPorIdAsync(id);

                if (pessoa == null)
                    return NotFound(new { message = "Pessoa não encontrada" });

                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar pessoa", error = ex.Message });
            }
        }

        // Cria uma nova pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> Criar(CriarPessoaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var pessoa = new Pessoa
                {
                    Nome = dto.Nome,
                    Idade = dto.Idade
                };

                var criada = await _pessoaServico.CriarAsync(pessoa);

                return CreatedAtAction(
                    nameof(ObterPorId),
                    new { id = criada.Id },
                    criada
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar pessoa", error = ex.Message });
            }
        }

        // Deleta uma pessoa e todas suas transações
        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            try
            {
                var deletado = await _pessoaServico.DeletarAsync(id);

                if (!deletado)
                    return NotFound(new { message = "Pessoa não encontrada" });

                return Ok(new { message = "Pessoa e suas transações deletadas com sucesso" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao deletar pessoa", error = ex.Message });
            }
        }
    }
}
