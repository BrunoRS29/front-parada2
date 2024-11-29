import axios from 'axios';

const API_URL = "http://localhost:8080";

export const getOrdens = async () => {
    try {
        const response = await axios.get(`${API_URL}/ordenServicos`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar ordens de servico', error);
        throw error;
    }
};

export const createOrdem = async (ordem) => {
    await axios.post(`${API_URL}/ordemServico/criar`, ordem);
};

export const updateOrdem = async (id, ordem) => {
    await axios.put(`${API_URL}/ordemServico/atualizar/${id}`, ordem);
};

export const deleteOrdem = async (id) => {
    await axios.delete(`${API_URL}/ordemServico/remover/${id}`);
};
