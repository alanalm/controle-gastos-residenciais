import { api } from "../api/api";
import type { Categoria } from "../models/Categoria";

/**
 * Serviço responsável por comunicação com a API de categorias.
 */
export const categoriaService = {
    /**
     * Retorna todas as categorias cadastradas.
     */
    async obterTodas(): Promise<Categoria[]> {
        const response = await api.get<Categoria[]>("/categorias");
        return response.data;
    },

    /**
     * Retorna uma categoria específica pelo ID.
     */
    async obterPorId(id: number): Promise<Categoria> {
        const response = await api.get<Categoria>(`/categorias/${id}`);
        return response.data;
    },

    /**
     * Cria uma nova categoria.
     */
    async criar(categoria: { descricao: string; finalidade: number }): Promise<Categoria> {
        const response = await api.post<Categoria>("/categorias", categoria);
        return response.data;
    },
};
