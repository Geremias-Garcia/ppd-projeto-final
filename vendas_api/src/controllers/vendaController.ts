import { Request, Response } from 'express';
import { Venda } from '../models/Venda';

export const cadastrarVenda = async (req: Request, res: Response) => {
    const { cliente, produto, data } = req.body;

    // Converte os campos para os tipos esperados:
    const clienteId = Number(cliente);
    const produtoId = Number(produto);
    const dataVenda = new Date(data);

    if (clienteId && produtoId && data) {
        try {
            const novaVenda = await Venda.create({
                cliente: clienteId,
                produto: produtoId,
                data: dataVenda
            });

            return res.status(201).json({
                message: "Venda cadastrada com sucesso.",
                novaVenda
            });
        } catch (error) {
            console.error("Erro ao cadastrar venda:", error);
            return res.status(500).json({ error: 'Erro ao cadastrar a venda.' });
        }
    } else {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
};


export const listarVendas = async (req: Request, res: Response) => {
    try {
        const vendas = await Venda.findAll();
        res.status(200).json({ vendas });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar as vendas.' });
    }
};

export const editarVenda = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cliente, produto, data } = req.body;

    try {
        const venda = await Venda.findByPk(id);

        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada.' });
        }

        venda.cliente = cliente ?? venda.cliente;
        venda.produto = produto ?? venda.produto;
        venda.data = data ?? venda.data;

        await venda.save();

        return res.status(200).json({
            message: 'Venda atualizada com sucesso.',
            venda
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar a venda.' });
    }
};

export const obterVenda = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const venda = await Venda.findByPk(id);

        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada.' });
        }

        return res.status(200).json(venda);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a venda.' });
    }
};


export const deletarVenda = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const venda = await Venda.findByPk(id);

        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada.' });
        }

        await venda.destroy();

        return res.status(200).json({ message: 'Venda removida com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a venda.' });
    }
};
