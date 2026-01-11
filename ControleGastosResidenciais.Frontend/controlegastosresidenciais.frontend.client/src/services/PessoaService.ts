import { api } from "../api/api";
import type { Pessoa } from "../models/Pessoa";

/**
 * Serviço responsável por comunicação com a API de pessoas.
 */
export const pessoaService = {
    /**
     * Retorna todas as pessoas cadastradas.
     */
    async obterTodas(): Promise<Pessoa[]> {
        const response = await api.get<Pessoa[]>("/pessoas");
        return response.data;
    },

    /**
     * Retorna uma pessoa pelo ID.
     */
    async obterPorId(id: number): Promise<Pessoa> {
        const response = await api.get<Pessoa>(`/pessoas/${id}`);
        return response.data;
    },

    /**
     * Cria uma nova pessoa.
     */
    async criar(pessoa: { nome: string; idade: number }): Promise<Pessoa> {
        const response = await api.post<Pessoa>("/pessoas", pessoa);
        return response.data;
    },

    /**
     * Remove uma pessoa do sistema.
     */
    async deletar(id: number): Promise<void> {
        await api.delete(`/pessoas/${id}`);
    },
};
