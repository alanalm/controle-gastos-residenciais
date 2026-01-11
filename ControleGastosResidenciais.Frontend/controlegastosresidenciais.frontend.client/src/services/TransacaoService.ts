import { api } from "../api/api";
import axios from "axios";
import type { Transacao } from "../models/Transacao";

/**
 * Serviço responsável pelas operações relacionadas a transações financeiras.
 */
export const transacaoService = {
    /**
     * Retorna todas as transações cadastradas.
     */
    async obterTodas(): Promise<Transacao[]> {
        const response = await api.get<Transacao[]>("/transacoes");
        return response.data;
    },

    /**
     * Retorna uma transação específica pelo ID.
     */
    async obterPorId(id: number): Promise<Transacao> {
        const response = await api.get<Transacao>(`/transacoes/${id}`);
        return response.data;
    },

    /**
     * Retorna todas as transações associadas a uma pessoa.
     */
    async obterPorPessoa(pessoaId: number): Promise<Transacao[]> {
        const response = await api.get<Transacao[]>(`/transacoes/pessoa/${pessoaId}`);
        return response.data;
    },

    /**
     * Cria uma nova transação.
     * A validação de regras de negócio é realizada no backend.
     */
    async criar(transacao: {
        descricao: string;
        valor: number;
        tipo: number;
        categoriaId: number;
        pessoaId: number;
        dataTransacao?: string;
    }): Promise<Transacao> {
        try {
            const response = await api.post<Transacao>("/transacoes", transacao);
            return response.data;
        } catch (error: any) {
            const data = error?.response?.data;

            if (typeof data === "string") {
                throw new Error(data);
            }

            if (data?.message) {
                throw new Error(data.message);
            }

            throw new Error("Erro ao criar transação.");
        }
    },
};
