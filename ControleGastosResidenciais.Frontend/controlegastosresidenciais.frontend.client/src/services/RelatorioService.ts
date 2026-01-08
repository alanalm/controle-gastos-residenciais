import { api } from "../api/api";
export const RelatorioService = {
    async totaisPorPessoa() {
        const { data } = await api.get("/relatorios/totais-por-pessoa");
        return data;
    },

    async totaisPorCategoria() {
        const { data } = await api.get("/relatorios/totais-por-categoria");
        return data;
    }
};

