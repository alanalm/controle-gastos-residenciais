import { useEffect, useState } from "react";
import { pessoaService } from "../services/PessoaService";

type Pessoa = {
    id: number;
    nome: string;
    idade: number;
};

export function PessoasPage() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [novaPessoa, setNovaPessoa] = useState({ nome: "", idade: 0 });

    useEffect(() => {
        async function fetchPessoas() {
            const data = await pessoaService.obterTodas();
            setPessoas(data);
        }
        fetchPessoas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const criada = await pessoaService.criar(novaPessoa);
            setPessoas([criada, ...pessoas]);
            setNovaPessoa({ nome: "", idade: 0 });
            alert("Pessoa criada com sucesso!");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar pessoa");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Pessoas</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={novaPessoa.nome}
                    onChange={(e) => setNovaPessoa({ ...novaPessoa, nome: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={novaPessoa.idade}
                    onChange={(e) => setNovaPessoa({ ...novaPessoa, idade: Number(e.target.value) })}
                    required
                />
                <button type="submit">Adicionar</button>
            </form>

            <table border={1} cellPadding={5} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.idade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PessoasPage;