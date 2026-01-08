import { api } from "../api/api";

// Funções relacionadas ao controller Pessoas
export const pessoaService = {
    // Buscar todas as pessoas
    async obterTodas() {
        const response = await api.get("/pessoas");
        return response.data;
    },

    // Buscar pessoa por ID
    async obterPorId(id: number) {
        const response = await api.get(`/pessoas/${id}`);
        return response.data;
    },

    // Criar nova pessoa
    async criar(pessoa: { nome: string; idade: number }) {
        const response = await api.post("/pessoas", pessoa);
        return response.data;
    },

    // Deletar pessoa
    async deletar(id: number) {
        const response = await api.delete(`/pessoas/${id}`);
        return response.data;
    },
};
