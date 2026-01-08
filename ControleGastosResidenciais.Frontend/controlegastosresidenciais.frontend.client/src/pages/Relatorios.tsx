import { useEffect, useState } from "react";
import { RelatorioService } from "../services/RelatorioService";
import PageContainer, { tableStyle, thStyle, tdStyle } from "../components/PageContainer";

type TipoRelatorio = "pessoa" | "categoria";

export function RelatoriosPage() {
    const [tipo, setTipo] = useState<TipoRelatorio>("pessoa");
    const [dados, setDados] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarRelatorio();
    }, [tipo]);

    async function carregarRelatorio() {
        setLoading(true);
        setDados(null);
        try {
            const result =
                tipo === "pessoa"
                    ? await RelatorioService.totaisPorPessoa()
                    : await RelatorioService.totaisPorCategoria();
            setDados(result);
        } catch (err) {
            console.error(err);
            setDados({ pessoas: [], categorias: [], totalGeral: { totalReceitas: 0, totalDespesas: 0, saldoLiquido: 0 } });
        } finally {
            setLoading(false);
        }
    }

    const pessoas = tipo === "pessoa" ? dados?.pessoas ?? [] : [];
    const categorias = tipo === "categoria" ? dados?.categorias ?? [] : [];
    const totalGeral = dados?.totalGeral ?? { totalReceitas: 0, totalDespesas: 0, saldoLiquido: 0 };

    return (
        <PageContainer title="Relatórios">
            {/* Seletor */}
            <div style={{ marginBottom: "24px" }}>
                <label style={{ marginRight: "8px", fontWeight: 500 }}>Visualizar por:</label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoRelatorio)}
                    style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#111827", color: "#f9fafb" }}
                >
                    <option value="pessoa">Pessoa</option>
                    <option value="categoria">Categoria</option>
                </select>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : tipo === "pessoa" ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Receitas</th>
                            <th style={thStyle}>Despesas</th>
                            <th style={thStyle}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map((p: any) => (
                            <tr key={p.id}>
                                <td style={tdStyle}>{p.nome}</td>
                                <td style={tdStyle}>R$ {p.totalReceitas.toFixed(2)}</td>
                                <td style={tdStyle}>R$ {p.totalDespesas.toFixed(2)}</td>
                                <td style={tdStyle}>R$ {p.saldo.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style={tdStyle}><strong>Total Geral</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.totalReceitas.toFixed(2)}</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.totalDespesas.toFixed(2)}</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.saldoLiquido.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Categoria</th>
                            <th style={thStyle}>Receitas</th>
                            <th style={thStyle}>Despesas</th>
                            <th style={thStyle}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((c: any) => (
                            <tr key={c.id}>
                                <td style={tdStyle}>{c.descricao}</td>
                                <td style={tdStyle}>R$ {c.totalReceitas.toFixed(2)}</td>
                                <td style={tdStyle}>R$ {c.totalDespesas.toFixed(2)}</td>
                                <td style={tdStyle}>R$ {c.saldo.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style={tdStyle}><strong>Total Geral</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.totalReceitas.toFixed(2)}</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.totalDespesas.toFixed(2)}</strong></td>
                            <td style={tdStyle}><strong>R$ {totalGeral.saldoLiquido.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </PageContainer>
    );
}

export default RelatoriosPage;

