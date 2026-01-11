import axios from "axios";

/**
 * Instância centralizada do Axios para comunicação com a API backend.
 * Facilita manutenção, reaproveitamento e configuração global de headers.
 */
export const api = axios.create({
    baseURL: "https://localhost:7065/api",
    headers: {
        "Content-Type": "application/json",
    },
});
