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
        private readonly PessoaService _pessoaService;

        public PessoasController(PessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        // Retorna todas as pessoas cadastradas
        [HttpGet]
        public async Task<ActionResult<List<Pessoa>>> GetAll()
        {
            try
            {
                var pessoas = await _pessoaService.ObterTodasAsync();
                return Ok(pessoas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar pessoas", error = ex.Message });
            }
        }

        // Retorna uma pessoa específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetById(int id)
        {
            try
            {
                var pessoa = await _pessoaService.ObterPorIdAsync(id);

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
        public async Task<ActionResult<Pessoa>> Create(CriarPessoaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            var criada = await _pessoaService.CriarAsync(pessoa);

            return CreatedAtAction(
                nameof(GetById),
                new { id = criada.Id },
                criada
            );
        }

        // Deleta uma pessoa e todas suas transações
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var deletado = await _pessoaService.DeletarAsync(id);

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
