import { api } from "../api/api";

/**
 * Serviço responsável por buscar dados consolidados de relatórios financeiros.
 */
export const RelatorioService = {
    /**
     * Retorna o relatório consolidado de receitas, despesas e saldo por pessoa.
     */
    async totaisPorPessoa(): Promise<any> {
        const { data } = await api.get("/relatorios/totais-por-pessoa");
        return data;
    },

    /**
     * Retorna o relatório consolidado de receitas, despesas e saldo por categoria.
     */
    async totaisPorCategoria(): Promise<any> {
        const { data } = await api.get("/relatorios/totais-por-categoria");
        return data;
    },
};
