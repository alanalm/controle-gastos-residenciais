using ControleGastosResidenciais.API.DTOs;
using ControleGastosResidenciais.API.Models;
using ControleGastosResidenciais.API.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriaServico _categoriaServico;

        public CategoriasController(CategoriaServico categoriaService)
        {
            _categoriaServico = categoriaService;
        }

        // Retorna todas as categorias cadastradas
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> ObterTodos()
        {
            try
            {
                var categorias = await _categoriaServico.ObterTodasAsync();
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar categorias", error = ex.Message });
            }
        }

        // Retorna uma categoria específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> ObterPorId(int id)
        {
            try
            {
                var categoria = await _categoriaServico.ObterPorIdAsync(id);

                if (categoria == null)
                    return NotFound(new { message = "Categoria não encontrada" });

                return Ok(categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar categoria", error = ex.Message });
            }
        }

        // Cria uma nova categoria
        [HttpPost]
        public async Task<ActionResult<Categoria>> Criar(CriarCategoriaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var categoria = new Categoria
                {
                    Descricao = dto.Descricao,
                    Finalidade = dto.Finalidade
                };

                var criada = await _categoriaServico.CriarAsync(categoria);

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
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar categoria", error = ex.Message });
            }
        }
    }
}
