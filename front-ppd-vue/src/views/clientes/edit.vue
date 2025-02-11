<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/clientes/EditView.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Editar Cliente</h3>
  
            <!-- Exibe erros de validação -->
            <div v-if="errors.length" class="mb-4">
              <ul class="text-red-500">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
  
            <!-- Formulário de edição -->
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="nome" class="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  id="nome"
                  v-model="cliente.nome"
                  required
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
  
              <div class="mb-4">
                <label for="telefone" class="block text-sm font-medium">Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  v-model="cliente.telefone"
                  required
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
  
              <div class="flex items-center justify-end">
                <button type="submit" class="px-4 py-2 text-black bg-blue-600 rounded-md hover:bg-blue-700">
                  Salvar Alterações
                </button>
                <router-link to="/clientes/index" class="mr-4 text-gray-500 hover:text-gray-700">
                  Cancelar
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { ClienteService } from "@/services/ClienteService";
  
  const router = useRouter();
  const route = useRoute();
  const cliente = ref({
    nome: "",
    telefone: "",
  });
  const errors = ref([]);
  
  const loadCliente = async () => {
    const id = route.params.id;
    // Buscando todos os clientes e filtrando pelo id
    const clientes = await ClienteService.getClientes();
    const found = clientes.find((c) => c.id == id);
    if (found) {
      cliente.value = { ...found };
    } else {
      errors.value.push("Cliente não encontrado.");
    }
  };
  
  const handleSubmit = async () => {
    errors.value = [];
    if (!cliente.value.nome) errors.value.push("Nome é obrigatório.");
    if (!cliente.value.telefone) errors.value.push("Telefone é obrigatório.");
  
    if (errors.value.length) return;
  
    const id = route.params.id;
    const response = await ClienteService.updateCliente(id, cliente.value);
    if (response) {
      router.push("/clientes/index");
    } else {
      errors.value.push("Erro ao atualizar cliente.");
    }
  };
  
  onMounted(() => {
    loadCliente();
  });
  </script>
  
  <style scoped lang="scss">
  /* Adicione seus estilos personalizados aqui */
  </style>
  