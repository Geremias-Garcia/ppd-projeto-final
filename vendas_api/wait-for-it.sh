#!/usr/bin/env sh
# wait-for-it.sh
# Aguarda que um host e porta estejam disponíveis antes de executar um comando
# Uso: ./wait-for-it.sh host:porta [-t timeout] [-- comando argumentos]

TIMEOUT=15

# Processa opções: neste exemplo, só suportamos a opção -t para timeout
while getopts "t:" opt; do
  case $opt in
    t)
      TIMEOUT=$OPTARG
      ;;
    *)
      echo "Uso: $0 host:porta [-t timeout] [-- comando argumentos]"
      exit 1
      ;;
  esac
done

shift $((OPTIND - 1))

if [ -z "$1" ]; then
  echo "Erro: host:porta não informado."
  echo "Uso: $0 host:porta [-t timeout] [-- comando argumentos]"
  exit 1
fi

HOST_PORT=$1
shift
HOST=$(echo "$HOST_PORT" | cut -d: -f1)
PORT=$(echo "$HOST_PORT" | cut -d: -f2)

echo "Aguardando $HOST:$PORT por até $TIMEOUT segundos..."

# Loop para verificar se o host e a porta estão disponíveis (utilizando netcat)
SECONDS=0
while [ $SECONDS -lt $TIMEOUT ]; do
  if nc -z "$HOST" "$PORT"; then
    break
  fi
  sleep 1
  SECONDS=$((SECONDS + 1))
done

if [ $SECONDS -ge $TIMEOUT ]; then
  echo "Timeout: $HOST:$PORT não respondeu em $TIMEOUT segundos."
  exit 1
fi

echo "$HOST:$PORT está disponível."

# Se houver um comando para executar, inicia-o
if [ "$#" -gt 0 ]; then
  exec "$@"
fi
