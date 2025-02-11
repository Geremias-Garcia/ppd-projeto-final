import { Router } from 'express';
import { cadastrarVenda, listarVendas, editarVenda, obterVenda,
     deletarVenda } from '../controllers/vendaController';

const router = Router();

router.post('/vendas', cadastrarVenda);
router.get('/vendas', listarVendas);
router.put('/vendas/:id', editarVenda);
router.get('/vendas/:id', obterVenda);
router.delete('/vendas/:id', deletarVenda);

export default router;
