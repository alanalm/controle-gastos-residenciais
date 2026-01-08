import { useEffect, useState } from "react";
import { pessoaService } from "../services/PessoaService";
import type { Pessoa } from "../models/Pessoa";
import PageContainer, {
    formStyle,
    inputStyle,
    buttonStyle,
    tableStyle,
    thStyle,
    tdStyle,
    actionButtonStyle,
    deleteButtonStyle,
} from "../components/PageContainer";

export function PessoasPage() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [novaPessoa, setNovaPessoa] = useState({ nome: "", idade: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarPessoas();
    }, []);

    async function carregarPessoas() {
        const data = await pessoaService.obterTodas();
        setPessoas(data);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const criada = await pessoaService.criar(novaPessoa);
            setPessoas([criada, ...pessoas]);
            setNovaPessoa({ nome: "", idade: 0 });
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar pessoa");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("Deseja realmente excluir esta pessoa?")) return;

        try {
            await pessoaService.deletar(id);
            setPessoas(pessoas.filter((p) => p.id !== id));
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao excluir pessoa");
        }
    }

    return (
        <PageContainer title="Pessoas">
            {/* Formulário */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={novaPessoa.nome}
                    onChange={(e) =>
                        setNovaPessoa({ ...novaPessoa, nome: e.target.value })
                    }
                    required
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={novaPessoa.idade}
                    onChange={(e) =>
                        setNovaPessoa({ ...novaPessoa, idade: Number(e.target.value) })
                    }
                    required
                    min={0}
                    style={inputStyle}
                />
                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? "Salvando..." : "Adicionar"}
                </button>
            </form>

            {/* Tabela */}
            {pessoas.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Idade</th>
                            <th style={thStyle}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map((p) => (
                            <tr key={p.id}>
                                <td style={tdStyle}>{p.nome}</td>
                                <td style={tdStyle}>{p.idade}</td>
                                <td style={tdStyle}>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        style={deleteButtonStyle}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhuma pessoa cadastrada.</p>
            )}
        </PageContainer>
    );
}

export default PessoasPage;

