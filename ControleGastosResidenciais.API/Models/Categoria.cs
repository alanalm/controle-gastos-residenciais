using ControleGastosResidenciais.API.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastosResidenciais.API.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public FinalidadeCategoria Finalidade { get; set; }

        public DateTime DataCriacao { get; set; }

        // Navegação
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
