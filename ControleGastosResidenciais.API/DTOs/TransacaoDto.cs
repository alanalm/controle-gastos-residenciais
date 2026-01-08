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
    public class TransacaoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
        public int PessoaId { get; set; }
        public string NomePessoa { get; set; }
        public int CategoriaId { get; set; }
        public string NomeCategoria { get; set; }
        public DateTime DataTransacao { get; set; }
    }

}
