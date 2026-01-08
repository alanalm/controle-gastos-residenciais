import { api } from "../api/api";

export const transacaoService = {
    async obterTodas() {
        const response = await api.get("/transacoes");
        return response.data;
    },

    async obterPorId(id: number) {
        const response = await api.get(`/transacoes/${id}`);
        return response.data;
    },

    async obterPorPessoa(pessoaId: number) {
        const response = await api.get(`/transacoes/pessoa/${pessoaId}`);
        return response.data;
    },

    async criar(transacao: {
        descricao: string;
        valor: number;
        tipo: number;
        categoriaId: number;
        pessoaId: number;
        dataTransacao?: string;
    }) {
        const response = await api.post("/transacoes", transacao);
        return response.data;
    },
};

