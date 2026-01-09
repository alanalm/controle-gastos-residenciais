import { api } from "../api/api";
import axios from "axios";

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
        try {
            const response = await api.post("/transacoes", transacao);
            return response.data;
        } catch (error: any) {
            // Se for erro do Axios e a API retornou mensagem
            if (axios.isAxiosError(error)) {
                const mensagem =
                    error.response?.data?.mensagem ||
                    error.response?.data ||
                    "Erro ao criar transação.";

                throw mensagem;
            }

            // Erro inesperado
            throw "Erro inesperado ao criar transação.";
        }
    },
};
