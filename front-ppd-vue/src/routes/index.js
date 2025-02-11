import { createWebHashHistory, createRouter } from 'vue-router';

import ProdutoIndex from '../views/produtos/index.vue'
import ProdutoCreate from "../views/produtos/create.vue"; // Crie este componente para o formulário de criação
import ProdutoEdit from "../views/produtos/edit.vue";
import ClienteIndex from '../views/clientes/index.vue'
import ClienteCreate from "../views/clientes/create.vue"; // Crie este componente para o formulário de criação
import ClienteEdit from "../views/clientes/edit.vue";
import VendaIndex from '../views/vendas/index.vue';
import VendaCreate from "../views/vendas/create.vue"; // Crie este componente para o formulário de criação
import VendaEdit from "../views/vendas/edit.vue";



const routes = [
  { path: '/produtos/index', component: ProdutoIndex },
  { path: '/produtos/create', component: ProdutoCreate },
  { path: '/produtos/edit/:id', component: ProdutoEdit, props: true },
  { path: '/clientes/index', component: ClienteIndex },
  { path: '/clientes/create', component: ClienteCreate },
  { path: '/clientes/edit/:id', component: ClienteEdit, props: true },
  { path: '/vendas/index', component: VendaIndex },
  { path: '/vendas/create', component: VendaCreate },
  { path: '/vendas/edit/:id', component: VendaEdit, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
}) 

export default router;