<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/vendas/EditView.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Editar Venda</h3>
  
            <!-- Exibe erros de validação -->
            <div v-if="errors.length" class="mb-4">
              <ul class="text-red-500">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
  
            <!-- Formulário de edição -->
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
                <label for="data" class="block text-sm font-medium">Data</label>
                <!-- Usando input de data para edição; ajuste conforme necessário -->
                <input
                  type="date"
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
                  Salvar Alterações
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
  import { useRouter, useRoute } from "vue-router";
  import { VendaService } from "@/services/VendaService";
  import { ClienteService } from "@/services/ClienteService";
  import { ProdutoService } from "@/services/ProdutoService";
  
  const router = useRouter();
  const route = useRoute();
  
  // Inicializa a venda com campos vazios
  const venda = ref({
    cliente: "",
    produto: "",
    data: "",
  });
  const clientes = ref([]);
  const produtos = ref([]);
  const errors = ref([]);
  
  const loadOptions = async () => {
    clientes.value = await ClienteService.getClientes();
    produtos.value = await ProdutoService.getProdutos();
  };
  
  const loadVenda = async () => {
    const id = route.params.id;
    // Supondo que VendaService tenha um método getVenda; caso não, você pode implementar
    const data = await VendaService.getVenda(id);
    if (data) {
      // Caso a API retorne a venda com os campos esperados
      venda.value = data;
    } else {
      errors.value.push("Venda não encontrada.");
    }
  };
  
  const handleSubmit = async () => {
    errors.value = [];
    if (!venda.value.cliente) errors.value.push("Cliente é obrigatório.");
    if (!venda.value.produto) errors.value.push("Produto é obrigatório.");
    if (!venda.value.data) errors.value.push("Data é obrigatória.");
  
    if (errors.value.length) return;
  
    const id = route.params.id;
    const response = await VendaService.updateVenda(id, venda.value);
    if (response) {
      router.push("/vendas/index");
    } else {
      errors.value.push("Erro ao atualizar venda.");
    }
  };
  
  onMounted(async () => {
    await loadOptions();
    await loadVenda();
  });
  </script>
  
  <style scoped lang="scss">
  /* Adicione seus estilos personalizados aqui */
  </style>
  