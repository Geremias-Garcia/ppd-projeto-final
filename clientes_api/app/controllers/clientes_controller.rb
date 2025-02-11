class ClientesController < ApplicationController
  # Lista todos os clientes
  def index
    @clientes = Cliente.all
    render json: @clientes
  end

  # Exibe um cliente específico
  def show
    @cliente = Cliente.find(params[:id])
    render json: @cliente
  end

  # Cria um novo cliente
  def create
    @cliente = Cliente.new(cliente_params)
    if @cliente.save
      render json: @cliente, status: :created
    else
      render json: { errors: @cliente.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Atualiza os dados de um cliente
  def update
    @cliente = Cliente.find(params[:id])
    if @cliente.update(cliente_params)
      render json: @cliente
    else
      render json: { errors: @cliente.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Exclui um cliente
  def destroy
    @cliente = Cliente.find(params[:id])
    if @cliente.destroy
      head :no_content
    else
      render json: { errors: "Erro ao excluir cliente" }, status: :unprocessable_entity
    end
  end

  private

  def cliente_params
    params.require(:cliente).permit(:nome, :telefone)
  end
end
