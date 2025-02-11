// src/services/VendaService.js
import axios from "axios";

const apiClientesUrl = "http://localhost:3001/clientes";
const apiProdutosUrl = "http://localhost:3000/produtos";
const apiVendasUrl = "http://localhost:3002/vendas";

export const VendaService = {
    async getVendas() {
        try {
          const [clientesRes, produtosRes, vendasRes] = await Promise.all([
            axios.get(apiClientesUrl),
            axios.get(apiProdutosUrl),
            axios.get(apiVendasUrl),
          ]);
    
          // Converter IDs para número e garantir arrays
          const clientes = clientesRes.data.map(c => ({ ...c, id: Number(c.id) }));
          const produtos = produtosRes.data.map(p => ({ ...p, id: Number(p.id) }));
          
          // Extrair vendas (considerando diferentes formatos de resposta)
          let vendasArray = vendasRes.data?.vendas || vendasRes.data || [];
    
          // Converter IDs das vendas para número
          vendasArray = vendasArray.map(v => ({
            ...v,
            id: Number(v.id),
            cliente: Number(v.cliente),
            produto: Number(v.produto)
          }));
    
          // Mesclar dados
          const vendasCompletas = vendasArray.map((venda) => {
            const cliente = clientes.find(c => c.id === venda.cliente);
            const produto = produtos.find(p => p.id === venda.produto);
    
            return {
              id: venda.id,
              cliente: cliente?.nome || 'Cliente não encontrado',
              produto: produto?.nome || 'Produto não encontrado',
              valor: produto?.valor || 0,
              data: venda.data
            };
          });
    
          return vendasCompletas;
        } catch (error) {
          console.error("Erro ao buscar vendas:", error);
          return [];
        }
      },

  async getVenda(id) {
    try {
      const response = await axios.get(`${apiVendasUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar venda:", error);
      return null;
    }
  },

  async createVenda(vendaData) {
    try {
      const response = await axios.post(apiVendasUrl, vendaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
    }
  },

  async updateVenda(id, vendaData) {
    try {
      const response = await axios.put(`${apiVendasUrl}/${id}`, vendaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar venda:", error);
    }
  },

  async deleteVenda(id) {
    try {
      const response = await axios.delete(`${apiVendasUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir venda:", error);
    }
  },
};
