import axios from 'axios';

const API_URL = "http://localhost:8080"; 

export const getClientes = async () => {
    try {
        const response = await axios.get(`${API_URL}/listarCliente`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar clientes', error);
        throw error;
    }
};

export const createCliente = async (cliente) => {
    await axios.post(`${API_URL}/clientes`, cliente);
};

export const updateCliente = async (id, cliente) => {
    await axios.put(`${API_URL}/clientes/${id}`, cliente);
};

export const deleteCliente = async (id) => {
    await axios.delete(`${API_URL}/clientes/${id}`);
};
