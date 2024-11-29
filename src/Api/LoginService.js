import axios from 'axios';

const API_URL = "http://localhost:8080";

const LoginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {email, password});
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao conectar ao servidor";
  }
};

export default LoginService;