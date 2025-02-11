// src/services/ClienteService.js
import axios from "axios";

const apiUrl = "http://localhost:3001/clientes"; // Porta 3001 para evitar conflito com o serviço de produtos

export const ClienteService = {
  async getClientes() {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return [];
    }
  },

  async createCliente(clienteData) {
    try {
      const response = await axios.post(apiUrl, clienteData);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  },

  async updateCliente(id, clienteData) {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, clienteData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  },

  async deleteCliente(id) {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }
};
