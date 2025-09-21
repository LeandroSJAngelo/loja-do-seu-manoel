import { Produto } from "./produto.entity";

export class ProdutoSemCaixa {
  caixa_id: null = null;
  produtos: Produto[];
  observacao: string;

  constructor(produto: Produto) {
    this.produtos = [produto];
    this.observacao = `Produto ${produto.produto_id} não coube em nenhuma caixa disponível.`;
  }
}