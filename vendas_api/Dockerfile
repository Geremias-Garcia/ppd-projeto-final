# Utiliza uma imagem leve do Node.js
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências para instalar as bibliotecas (package.json e package-lock.json, se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código para dentro do container
COPY . .

# Expõe a porta definida no .env (neste exemplo, 3002)
EXPOSE 3002

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "start-dev"]
