namespace ControleGastosResidenciais.API.Models.Enums
{
    // Enumeração que define para qual finalidade a categoria pode ser utilizada
    public enum FinalidadeCategoria
    {
        // Categoria pode ser usada apenas para despesas
        Despesa = 1,

        // Categoria pode ser usada apenas para receitas
        Receita = 2,

        // Categoria pode ser usada tanto para despesas quanto para receitas
        Ambas = 3
    }
}
