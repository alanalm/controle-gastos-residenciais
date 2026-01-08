import { useEffect, useState } from "react";
import { categoriaService } from "../services/CategoriaService";
import { pessoaService } from "../services/PessoaService";
import { transacaoService } from "../services/TransacaoService";
import type { Transacao } from "../models/Transacao";
import type { Pessoa } from "../models/Pessoa";
import type { Categoria } from "../models/Categoria";

import PageContainer, {
    formStyle,
    inputStyle,
    selectStyle,
    buttonStyle,
    tableStyle,
    thStyle,
    tdStyle,
} from "../components/PageContainer";

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
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const criada = await transacaoService.criar(novaTransacao);
            setTransacoes([criada, ...transacoes]);
            setNovaTransacao({ ...novaTransacao, descricao: "", valor: 0 });
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar transação");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title="Transações">
            {/* Formulário */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={novaTransacao.descricao}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                    style={inputStyle}
                    required
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={novaTransacao.valor}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: Number(e.target.value) })}
                    style={inputStyle}
                    required
                />
                <select
                    value={novaTransacao.tipo}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: Number(e.target.value) })}
                    style={selectStyle}
                >
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                </select>
                <select
                    value={novaTransacao.pessoaId}
                    onChange={(e) => setNovaTransacao({ ...novaTransacao, pessoaId: Number(e.target.value) })}
                    style={selectStyle}
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
                    style={selectStyle}
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
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? "Salvando..." : "Adicionar"}
                </button>
            </form>

            {/* Tabela */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Descrição</th>
                        <th style={thStyle}>Valor</th>
                        <th style={thStyle}>Tipo</th>
                        <th style={thStyle}>Pessoa</th>
                        <th style={thStyle}>Categoria</th>
                        <th style={thStyle}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map((t) => (
                        <tr key={t.id}>
                            <td style={tdStyle}>{t.descricao}</td>
                            <td style={tdStyle}>R$ {t.valor.toFixed(2)}</td>
                            <td style={tdStyle}>{Number(t.tipo) === 1 ? "Despesa" : "Receita"}</td>
                            <td style={tdStyle}>{t.nomePessoa ?? "—"}</td>
                            <td style={tdStyle}>{t.nomeCategoria ?? "—"}</td>
                            <td style={tdStyle}>{new Date(t.dataTransacao).toLocaleDateString("pt-BR")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {transacoes.length === 0 && <p>Nenhuma transação cadastrada.</p>}
        </PageContainer>
    );
}

export default TransacoesPage;

