<!-- src/views/produtos/IndexView.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Lista de Produtos</h3>
  
            <!-- Botão Cadastrar Produto -->
            <div class="mb-4">
              <!-- Usando router-link para navegação -->
              <router-link to="/produtos/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Cadastrar Produto
              </router-link>
            </div>
  
            <!-- Tabela de Produtos -->
            <template v-if="produtos.length">
              <table class="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th class="py-2 px-4 border">Nome</th>
                    <th class="py-2 px-4 border">Descrição</th>
                    <th class="py-2 px-4 border">Valor</th>
                    <th class="py-2 px-4 border">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="produto in produtos" :key="produto.id">
                    <td class="py-2 px-4 border">{{ produto.nome }}</td>
                    <td class="py-2 px-4 border">{{ produto.descricao }}</td>
                    <td class="py-2 px-4 border">{{ produto.valor }}</td>
                    <td class="py-2 px-4 border flex gap-2">
                      <!-- Botão Editar -->
                      <router-link :to="`/produtos/edit/${produto.id}`" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                        Editar
                      </router-link>
                      <!-- Botão Excluir -->
                      <button @click="deleteProduto(produto.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <p>Nenhum produto encontrado.</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { ProdutoService } from "@/services/ProdutoService";
  
  // Array reativo para armazenar os produtos
  const produtos = ref<Array<{ id: number; nome: string; descricao: string; valor: number }>>([]);
  
  // Obter instância do router para navegação (caso necessário)
  const router = useRouter();
  
  const loadProdutos = async () => {
    produtos.value = await ProdutoService.getProdutos();
  };
  
  const deleteProduto = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await ProdutoService.deleteProduto(id);
      await loadProdutos();
    }
  };
  
  onMounted(() => {
    loadProdutos();
  });
  </script>
  
  <style lang="scss" scoped>
  /* Adicione aqui seus estilos personalizados */
  </style>
  