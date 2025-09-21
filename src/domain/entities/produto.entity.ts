export class Produto {
  produto_id: string;
  altura: number;
  largura: number;
  comprimento: number;

  constructor(produto_id: string, altura: number, largura: number, comprimento: number) {
    this.produto_id = produto_id;
    this.altura = altura;
    this.largura = largura;
    this.comprimento = comprimento;

    if (altura <= 0 || largura <= 0 || comprimento <= 0) {
      throw new Error('Dimensões do produto devem ser maiores que zero.');
    }
  }

  get volume(): number {
    return this.altura * this.largura * this.comprimento;
  }
}