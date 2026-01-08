import { useEffect, useState } from "react";
import { categoriaService } from "../services/CategoriaService";

type Categoria = {
    id: number;
    descricao: string;
    finalidade: number;
};

export function CategoriasPage() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novaCategoria, setNovaCategoria] = useState({
        descricao: "",
        finalidade: 1, // 1 = Despesa, 2 = Receita, 3 = Ambas
    });

    useEffect(() => {
        async function fetchCategorias() {
            const data = await categoriaService.obterTodas();
            setCategorias(data);
        }
        fetchCategorias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const criada = await categoriaService.criar(novaCategoria);
            setCategorias([criada, ...categorias]);
            setNovaCategoria({ descricao: "", finalidade: 1 });
            alert("Categoria criada com sucesso!");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro ao criar categoria");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Categorias</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={novaCategoria.descricao}
                    onChange={(e) => setNovaCategoria({ ...novaCategoria, descricao: e.target.value })}
                    required
                />
                <select
                    value={novaCategoria.finalidade}
                    onChange={(e) => setNovaCategoria({ ...novaCategoria, finalidade: Number(e.target.value) })}
                >
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                    <option value={3}>Ambas</option>
                </select>
                <button type="submit">Adicionar</button>
            </form>

            <table border={1} cellPadding={5} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Finalidade</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((c) => (
                        <tr key={c.id}>
                            <td>{c.descricao}</td>
                            <td>{c.finalidade === 1 ? "Despesa" : c.finalidade === 2 ? "Receita" : "Ambas"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default CategoriasPage;