<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/clientes/index.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <router-link to="/clientes/create" class="px-4 py-2 bg-green-500 text-white rounded">
              Cadastrar Cliente
            </router-link>
  
            <h3 class="mt-4">Lista de Clientes</h3>
  
            <template v-if="clientes.length">
              <table class="min-w-full mt-4">
                <thead>
                  <tr>
                    <th class="py-2 px-4 border-b">Nome</th>
                    <th class="py-2 px-4 border-b">Telefone</th>
                    <th class="py-2 px-4 border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in clientes" :key="cliente.id">
                    <td class="py-2 px-4 border-b">{{ cliente.nome }}</td>
                    <td class="py-2 px-4 border-b">{{ cliente.telefone }}</td>
                    <td class="py-2 px-4 border-b">
                      <router-link :to="`/clientes/edit/${cliente.id}`" class="px-2 py-1 bg-blue-500 text-white rounded">
                        Editar
                      </router-link>
                      <button
                        @click="deleteCliente(cliente.id)"
                        class="px-2 py-1 bg-red-500 text-white rounded ml-2"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <p>Nenhum cliente encontrado.</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { ClienteService } from "@/services/ClienteService";
  
  const clientes = ref([]);
  
  const loadClientes = async () => {
    clientes.value = await ClienteService.getClientes();
  };
  
  const deleteCliente = async (id) => {
    if (confirm("Deseja excluir este cliente?")) {
      await ClienteService.deleteCliente(id);
      await loadClientes();
    }
  };
  
  onMounted(() => {
    loadClientes();
  });
  </script>
  
  <style scoped>
  /* Adicione seus estilos personalizados, se necessário */
  </style>
  