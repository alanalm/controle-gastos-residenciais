import { useEffect, useState } from "react";
import { categoriaService } from "../services/CategoriaService";
import { pessoaService } from "../services/PessoaService";
import { transacaoService } from "../services/TransacaoService";
import type { Transacao } from "../models/Transacao";
import type { Pessoa } from "../models/Pessoa";
import type { Categoria } from "../models/Categoria";


export function TransacoesPage() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novaTransacao, setNovaTransacao] = useState({
        descricao: "",
        valor: 0,
        tipo: 1,
        pessoaId: 0,
        categoriaId: 0,
        dataTransacao: new Date().toISOString().slice(0, 10),
    });

    // Carregar dados iniciais
    useEffect(() => {
        async function fetchData() {
            const [pessoasData, categoriasData, transacoesData] = await Promise.all([
                pessoaService.obterTodas(),
                categoriaService.obterTodas(),
                transacaoService.obterTodas(),
            ]);
            setPessoas(pessoasData);
            setCategorias(categoriasData);
            setTransacoes(transacoesData);
        }
        fetchData();
    }, []);

    // Criar transação
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const criada = await transacaoService.criar(novaTransacao);
            setTransacoes([criada, ...transacoes]);
            setNovaTransacao({ ...novaTransacao, descricao: "", valor: 0 });
            alert("Transação criada com sucesso!");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar transação");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Transações</h1>

            {/* Formulário de criação */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={novaTransacao.descricao}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={novaTransacao.valor}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: Number(e.target.value) })}
                    required
                />
                <select
                    value={novaTransacao.tipo}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: Number(e.target.value) })}
                >
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                </select>
                <select
                    value={novaTransacao.pessoaId}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, pessoaId: Number(e.target.value) })}
                    required
                >
                    <option value={0}>Selecione a Pessoa</option>
                    {pessoas.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nome}
                        </option>
                    ))}
                </select>
                <select
                    value={novaTransacao.categoriaId}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, categoriaId: Number(e.target.value) })}
                    required
                >
                    <option value={0}>Selecione a Categoria</option>
                    {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.descricao}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={novaTransacao.dataTransacao}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, dataTransacao: e.target.value })}
                    required
                />
                <button type="submit">Adicionar</button>
            </form>

            {/* Lista de transações */}
            <table border={1} cellPadding={5} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Pessoa</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map((t) => (
                        <tr key={t.id}>
                            <td>{t.descricao}</td>
                            <td>{t.valor.toFixed(2)}</td>
                            <td>{t.tipo === 1 ? "Despesa" : "Receita"}</td>
                            <td>{t.pessoa?.nome ?? "—"}</td>
                            <td>{t.categoria?.descricao ?? "—"}</td>
                            <td>{new Date(t.dataTransacao).toLocaleDateString('pt-BR')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TransacoesPage;