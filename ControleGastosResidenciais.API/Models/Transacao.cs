using ControleGastosResidenciais.API.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ControleGastosResidenciais.API.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
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

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime DataTransacao { get; set; }

        // Propriedades de navegação (não serializadas para evitar loops)
        [JsonIgnore]
        public Categoria? Categoria { get; set; }

        [JsonIgnore]
        public Pessoa? Pessoa { get; set; }
    }
}