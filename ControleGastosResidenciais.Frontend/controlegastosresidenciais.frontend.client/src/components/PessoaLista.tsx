import { useEffect, useState } from "react";
import { pessoaService } from "./services/pessoaService";

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

export function PessoasLista() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    useEffect(() => {
        pessoaService.obterTodas().then(setPessoas);
    }, []);

    return (
        <div>
            <h2>Pessoas cadastradas</h2>
            <ul>
                {pessoas.map(p => (
                    <li key={p.id}>
                        {p.nome} ({p.idade} anos)
                    </li>
                ))}
            </ul>
        </div>
    );
}
