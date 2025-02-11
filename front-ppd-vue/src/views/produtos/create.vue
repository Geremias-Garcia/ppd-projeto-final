<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/produtos/CreateView.vue -->
<template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <h3>Novo Produto</h3>
  
            <!-- Exibe erros de validação -->
            <div v-if="errors.length" class="mb-4">
              <ul class="text-red-500">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
  
            <!-- Formulário de criação -->
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="nome" class="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  id="nome"
                  v-model="produto.nome"
                  required
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
  
              <div class="mb-4">
                <label for="descricao" class="block text-sm font-medium">Descrição</label>
                <textarea
                  id="descricao"
                  v-model="produto.descricao"
                  required
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>
  
              <div class="mb-4">
                <label for="valor" class="block text-sm font-medium">Valor</label>
                <input
                  type="number"
                  id="valor"
                  v-model.number="produto.valor"
                  step="0.01"
                  required
                  class="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
  
              <div class="flex items-center justify-end">
                <button type="submit" class="px-4 py-2 text-black bg-blue-600 rounded-md hover:bg-blue-700">
                  Salvar
                </button>
                <router-link to="/produtos/index" class="mr-4 text-gray-500 hover:text-gray-700">
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ProdutoService } from "@/services/ProdutoService";
  
  const router = useRouter();
  const produto = ref({
    nome: "",
    descricao: "",
    valor: 0,
  });
  const errors = ref([]);
  
  const handleSubmit = async () => {
    errors.value = [];
    // Validações básicas
    if (!produto.value.nome) errors.value.push("Nome é obrigatório.");
    if (!produto.value.descricao) errors.value.push("Descrição é obrigatória.");
    if (!produto.value.valor) errors.value.push("Valor é obrigatório.");
  
    if (errors.value.length) return;
  
    const response = await ProdutoService.createProduto(produto.value);
    if (response) {
      router.push("/produtos/index");
    } else {
      errors.value.push("Erro ao cadastrar produto.");
    }
  };
  </script>
  
  <style scoped lang="scss">
  /* Adicione seus estilos personalizados aqui */
  </style>
  