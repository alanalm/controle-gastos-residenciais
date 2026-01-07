using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidenciais.API.DTOs
{
    public class CriarPessoaDto
    {
        [Required]
        [StringLength(200)]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 120)]
        public int Idade { get; set; }
    }
}
