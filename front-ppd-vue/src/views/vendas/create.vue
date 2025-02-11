<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/vendas/CreateView.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Cadastrar Venda</h3>
  
            <!-- Exibe erros de validação -->
            <div v-if="errors.length" class="mb-4">
              <ul class="text-red-500">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
  
            <!-- Formulário de criação -->
            <form @submit.prevent="handleSubmit">
              <!-- Combobox Clientes -->
              <div class="mb-4">
                <label for="cliente" class="block text-sm font-medium">Cliente</label>
                <select
                  id="cliente"
                  v-model="venda.cliente"
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                    {{ cliente.nome }}
                  </option>
                </select>
              </div>
  
              <!-- Combobox Produtos -->
              <div class="mb-4">
                <label for="produto" class="block text-sm font-medium">Produto</label>
                <select
                  id="produto"
                  v-model="venda.produto"
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecione um produto</option>
                  <option v-for="produto in produtos" :key="produto.id" :value="produto.id">
                    {{ produto.nome }}
                  </option>
                </select>
              </div>
  
              <!-- Campo Data -->
              <div class="mb-4">
                <label for="data" class="block text-sm font-medium">Data da Venda</label>
                <!-- Usando datetime-local para permitir seleção de data e hora -->
                <input
                  type="datetime-local"
                  id="data"
                  v-model="venda.data"
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
  
              <!-- Botões -->
              <div class="flex items-center justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 text-black bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Salvar
                </button>
                <router-link
                  to="/vendas/index"
                  class="mr-4 text-gray-500 hover:text-gray-700"
                >
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
  import { useRouter } from "vue-router";
  import { VendaService } from "@/services/VendaService";
  import { ClienteService } from "@/services/ClienteService";
  import { ProdutoService } from "@/services/ProdutoService";
  
  const router = useRouter();
  
  // Inicializa a venda com os campos necessários
  const venda = ref({
    cliente: "",
    produto: "",
    data: "",
  });
  
  // Arrays para armazenar as opções de clientes e produtos
  const clientes = ref([]);
  const produtos = ref([]);
  
  // Array para armazenar mensagens de erro
  const errors = ref([]);
  
  const loadOptions = async () => {
    clientes.value = await ClienteService.getClientes();
    produtos.value = await ProdutoService.getProdutos();
  };
  
  const handleSubmit = async () => {
    errors.value = [];
    if (!venda.value.cliente) errors.value.push("Cliente é obrigatório.");
    if (!venda.value.produto) errors.value.push("Produto é obrigatório.");
    if (!venda.value.data) errors.value.push("Data é obrigatória.");
  
    if (errors.value.length) return;
  
    const response = await VendaService.createVenda(venda.value);
    if (response) {
      router.push("/vendas/index");
    } else {
      errors.value.push("Erro ao cadastrar venda.");
    }
  };
  
  onMounted(() => {
    loadOptions();
  });
  </script>
  
  <style scoped lang="scss">
  /* Adicione seus estilos personalizados aqui */
  </style>
  