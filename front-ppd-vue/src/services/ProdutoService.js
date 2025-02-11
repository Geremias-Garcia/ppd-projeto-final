// src/services/ProdutoService.js
import axios from "axios";

const apiUrl = "http://localhost:3000/produtos"; // URL da API Rails

export const ProdutoService = {
  async getProdutos() {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  },

  async createProduto(produtoData) {
    try {
      const response = await axios.post(apiUrl, produtoData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  },

  async updateProduto(id, produtoData) {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, produtoData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  },

  async deleteProduto(id) {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  }
};
