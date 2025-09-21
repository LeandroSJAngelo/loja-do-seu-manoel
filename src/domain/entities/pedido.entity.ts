import { Produto } from "./produto.entity";

export class Pedido {
  pedido_id: number;
  produtos: Produto[];

  constructor(pedido_id: number, produtos: Produto[]) {
    this.pedido_id = pedido_id;
    this.produtos = produtos;

    if (!produtos || produtos.length === 0) {
      throw new Error('Um pedido deve conter pelo menos um produto.');
    }
  }
}