<!-- src/views/vendas/index.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Lista de Vendas</h3>
            <!-- Botão para cadastrar nova venda -->
            <div class="mb-4">
              <router-link
                to="/vendas/create"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Cadastrar Venda
              </router-link>
            </div>
  
            <!-- Tabela de Vendas -->
            <template v-if="vendas.length">
              <table class="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th class="py-2 px-4 border">Cliente</th>
                    <th class="py-2 px-4 border">Produto</th>
                    <th class="py-2 px-4 border">Data</th>
                    <th class="py-2 px-4 border">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="venda in vendas" :key="venda.id">
                    <td class="py-2 px-4 border">{{ venda.cliente }}</td>
                    <td class="py-2 px-4 border">{{ venda.produto }}</td>
                    <td class="py-2 px-4 border">{{ formatDate(venda.data) }}</td>
                    <td class="py-2 px-4 border flex gap-2">
                      <!-- Botão para editar -->
                      <router-link
                        :to="`/vendas/edit/${venda.id}`"
                        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Editar
                      </router-link>
                      <!-- Botão para excluir -->
                      <button
                        @click="deleteVenda(venda.id)"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <p>Nenhuma venda encontrada.</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { VendaService } from "@/services/VendaService";
  
  interface Venda {
    id: number;
    cliente: string;
    produto: string;
    valor: number;
    data: string;
  }
  
  const vendas = ref<Venda[]>([]);
  const router = useRouter();
  
  const loadVendas = async () => {
    vendas.value = await VendaService.getVendas();
  };
  
  const deleteVenda = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta venda?")) {
      await VendaService.deleteVenda(id);
      await loadVendas();
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };
  
  onMounted(() => {
    loadVendas();
  });
  </script>
  
  <style scoped lang="scss">
  /* Adicione aqui seus estilos personalizados */
  </style>
  