import type { Pessoa } from "./Pessoa";
import type { Categoria } from "./Categoria";

export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: "Despesa" | "Receita";
    dataTransacao: string;
    nomePessoa: string;
    nomeCategoria: string;
}

