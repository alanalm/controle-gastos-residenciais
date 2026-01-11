/**
 * Representa uma transação financeira registrada no sistema.
 * Os campos nomePessoa e nomeCategoria são retornados prontos pelo backend
 * para facilitar a exibição no front-end.
 */
export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: number;
    dataTransacao: string;
    nomePessoa: string;
    nomeCategoria: string;
}

