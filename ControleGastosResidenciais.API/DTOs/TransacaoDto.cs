using ControleGastosResidenciais.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidenciais.API.DTOs
{
    public class CriarTransacaoDto
    {
        [Required]
        [StringLength(500)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        [Required]
        public TipoTransacao Tipo { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [Required]
        public DateTime DataTransacao { get; set; }
    }
}
