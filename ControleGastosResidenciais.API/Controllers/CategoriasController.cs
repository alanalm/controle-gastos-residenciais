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
        private readonly CategoriaService _categoriaService;

        public CategoriasController(CategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        // Retorna todas as categorias cadastradas
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> GetAll()
        {
            try
            {
                var categorias = await _categoriaService.ObterTodasAsync();
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar categorias", error = ex.Message });
            }
        }

        // Retorna uma categoria específica por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetById(int id)
        {
            try
            {
                var categoria = await _categoriaService.ObterPorIdAsync(id);

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
        public async Task<ActionResult<Categoria>> Create(CriarCategoriaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = dto.Finalidade
            };

            var criada = await _categoriaService.CriarAsync(categoria);

            return CreatedAtAction(
                nameof(GetById),
                new { id = criada.Id },
                criada
            );
        }
    }
}
