import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/routes';
import { sequelize } from './instances/mysql'; // ajuste o caminho conforme sua estrutura de pastas

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.error(err);
    res.json({ error: 'Ocorreu algum erro.' });
};

server.use(errorHandler);

// Sincroniza os modelos com o banco de dados e só então inicia o servidor
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
        server.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });
