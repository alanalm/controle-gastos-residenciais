import { useEffect, useState } from "react";
import { categoriaService } from "../services/CategoriaService";
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

/**
 * Página responsável pelo cadastro e listagem de categorias financeiras.
 * Permite definir a finalidade da categoria (Despesa, Receita ou Ambas).
 */
export function CategoriasPage() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novaCategoria, setNovaCategoria] = useState({
        descricao: "",
        finalidade: 1, // 1 = Despesa, 2 = Receita, 3 = Ambas
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCategorias() {
            const data = await categoriaService.obterTodas();
            setCategorias(data);
        }
        fetchCategorias();
    }, []);

    /**
 * Realiza o cadastro de uma nova categoria e atualiza a lista local
 * sem a necessidade de nova requisição ao backend.
 */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const criada = await categoriaService.criar(novaCategoria);
            setCategorias([criada, ...categorias]);
            setNovaCategoria({ descricao: "", finalidade: 1 });
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar categoria");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title="Categorias">
            {/* Formulário */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={novaCategoria.descricao}
                    onChange={(e) =>
                        setNovaCategoria({ ...novaCategoria, descricao: e.target.value })
                    }
                    style={inputStyle}
                    required
                />
                <select
                    value={novaCategoria.finalidade}
                    onChange={(e) =>
                        setNovaCategoria({ ...novaCategoria, finalidade: Number(e.target.value) })
                    }
                    style={selectStyle}
                >
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                    <option value={3}>Ambas</option>
                </select>
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? "Salvando..." : "Adicionar"}
                </button>
            </form>

            {/* Tabela */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Descrição</th>
                        <th style={thStyle}>Finalidade</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((c) => (
                        <tr key={c.id}>
                            <td style={tdStyle}>{c.descricao}</td>
                            <td style={tdStyle}>
                                {c.finalidade === 1
                                    ? "Despesa"
                                    : c.finalidade === 2
                                        ? "Receita"
                                        : "Ambas"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {categorias.length === 0 && <p>Nenhuma categoria cadastrada.</p>}
        </PageContainer>
    );
}

export default CategoriasPage;

