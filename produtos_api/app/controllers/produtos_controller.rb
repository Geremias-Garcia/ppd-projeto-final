class ProdutosController < ApplicationController
  before_action :set_produto, only: %i[show update destroy]

  # GET /produtos
  def index
    @produtos = Produto.all
    render json: @produtos
  end

  # GET /produtos/:id
  def show
    render json: @produto
  end

  # POST /produtos
  def create
    @produto = Produto.new(produto_params)
    if @produto.save
      render json: @produto, status: :created
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # PUT /produtos/:id
  def update
    if @produto.update(produto_params)
      render json: @produto
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produtos/:id
  def destroy
    @produto.destroy
    head :no_content
  end

  private

  def set_produto
    @produto = Produto.find(params[:id])
  end

  def produto_params
    params.require(:produto).permit(:nome, :descricao, :valor)
  end
end
