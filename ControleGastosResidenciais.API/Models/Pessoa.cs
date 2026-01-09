using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastosResidenciais.API.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [Range(0, 120)]
        public int Idade { get; set; }

        public DateTime DataCriacao { get; set; }

        // Utilizado para validação de regras de negócio.
        [NotMapped]
        public bool EhMenorDeIdade => Idade < 18;

        // Navegação
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
