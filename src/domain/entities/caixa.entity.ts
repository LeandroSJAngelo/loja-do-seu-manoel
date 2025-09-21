import { Produto } from "./produto.entity";

export class Caixa {
  produtos: Produto[] = [];

  constructor(
    public readonly caixa_id: string,
    public readonly altura: number,
    public readonly largura: number,
    public readonly comprimento: number,
  ) {}


    get volume(): number {
      const volume = this.altura * this.largura * this.comprimento;
      return volume;
    }

    get espacoRestante(): number {
      const usado = this.produtos.reduce((sum, p) => sum + p.volume, 0);
      return this.volume - usado;
    }

    entraCaixa(produto: Produto): boolean {
      const p = [produto.altura, produto.largura, produto.comprimento];;
      const b = [this.altura, this.largura, this.comprimento];
      const permutations = this.permute(p);
      for (const perm of permutations) {
        if (perm[0] <= b[0] && perm[1] <= b[1] && perm[2] <= b[2]) return true;
      }
      return false;
    }


    addProduto(produto: Produto): boolean {
      if (this.entraCaixa(produto) && produto.volume <= this.espacoRestante) {
        this.produtos.push(produto);
        return true;
      }
      return false;
    }


    private permute(arr: number[]): number[][] {
      const results: number[][] = [];
      function helper(current: number[], remaining: number[]) {
        if (remaining.length === 0) results.push(current);
        else {
          for (let i = 0; i < remaining.length; i++) {
            const next = current.concat(remaining[i]);
            const rem = remaining.slice(0, i).concat(remaining.slice(i + 1));
            helper(next, rem);
          }
        }
      }
      helper([], arr);
      const uniq = results.map(r => r.join(','));
      return Array.from(new Set(uniq)).map(s => s.split(',').map(Number));
    }
}