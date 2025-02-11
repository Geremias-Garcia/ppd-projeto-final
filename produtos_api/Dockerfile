# Usa uma imagem oficial do Ruby com Node.js e Yarn
FROM ruby:3.2.2

# Instala dependências
RUN apt-get update -qq && apt-get install -y nodejs npm sqlite3 libsqlite3-dev

# Define diretório de trabalho
WORKDIR /rails

# Copia arquivos do projeto
COPY . /rails

# Instala as gems
RUN bundle install

# Ajusta os arquivos binários: remove CRLF e substitui "ruby.exe" por "ruby" no shebang
RUN chmod +x bin/* && \
    sed -i "s/\r$//g" bin/* && \
    sed -i '1 s/ruby\.exe/ruby/' bin/*

# Expõe a porta usada pelo Rails
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
