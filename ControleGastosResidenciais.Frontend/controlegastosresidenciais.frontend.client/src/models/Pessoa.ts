/**
 * Representa uma pessoa associada às transações financeiras.
 * O campo idade é opcional, pois nem sempre é informado no cadastro.
 */
export interface Pessoa {
    id: number;
    nome: string;
    idade?: number;
}
