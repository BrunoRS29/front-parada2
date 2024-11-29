import axios from 'axios';


const API_URL = "http://localhost:8080"; 

export const getAparelhos = async () => {
    try {
        const response = await axios.get(`${API_URL}/listarAparelho` );
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar aparelhos', error);
        throw error;
    }
};

export const createAparelho = async (aparelho) => {
    try {
        const response = await axios.post(API_URL, aparelho); 
        return response.data; 
    } catch (error) {
        console.error('Erro ao criar aparelho', error);
        throw error; 
    }
};


export const updateAparelho = async (id, aparelho) => {
    try {
        const response = await axios.put(`${API_URL}//alterarAparelho`, aparelho); 
        return response.data; 
    } catch (error) {
        console.error('Erro ao atualizar aparelho', error);
        throw error; 
    }
};


export const deleteAparelho = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/removerAparelho/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Erro ao excluir aparelho', error);
        throw error;
    }
};
