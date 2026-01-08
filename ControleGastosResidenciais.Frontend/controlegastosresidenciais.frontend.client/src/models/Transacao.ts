import type { Pessoa } from "./Pessoa";
import type { Categoria } from "./Categoria";

export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: number;
    dataTransacao: string;
    pessoaId: number;
    categoriaId: number;
    pessoa?: Pessoa;
    categoria?: Categoria;
}
