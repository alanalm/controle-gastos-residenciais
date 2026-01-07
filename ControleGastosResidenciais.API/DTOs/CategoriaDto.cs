using ControleGastosResidenciais.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidenciais.API.DTOs
{
    public class CriarCategoriaDto
    {
        [Required]
        [StringLength(200)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
