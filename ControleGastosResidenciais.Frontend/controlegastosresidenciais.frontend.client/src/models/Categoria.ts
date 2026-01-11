/**
 * Representa uma categoria de transação financeira.
 * A finalidade indica se a categoria é usada para receitas ou despesas.
 */
export interface Categoria {
    id: number;
    descricao: string;
    finalidade: number;
}

