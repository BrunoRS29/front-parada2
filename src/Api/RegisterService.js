import axios from "axios"

const API_URL = "http://localhost:8080";

const RegisterService = async (nome, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/registro`, {nome, email, password});
    return response.data;
  } catch (error) {
    throw error.response ? error.res.data : "Erro ao conectar ao servidor.";
  }
};

export default RegisterService;