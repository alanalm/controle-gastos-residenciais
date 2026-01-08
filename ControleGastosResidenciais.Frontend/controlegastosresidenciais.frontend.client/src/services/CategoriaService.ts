import { api } from "../api/api";

export const categoriaService = {
    async obterTodas() {
        const response = await api.get("/categorias");
        return response.data;
    },

    async obterPorId(id: number) {
        const response = await api.get(`/categorias/${id}`);
        return response.data;
    },

    async criar(categoria: { descricao: string; finalidade: number }) {
        const response = await api.post("/categorias", categoria);
        return response.data;
    },
};