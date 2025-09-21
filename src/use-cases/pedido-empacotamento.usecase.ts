import { Injectable } from "@nestjs/common";
import { Caixa } from "../domain/entities/caixa.entity";
import { Pedido } from "../domain/entities/pedido.entity";
import { ProdutoSemCaixa } from "../domain/entities/produto-sem-caixa.entity";
import { Produto } from "../domain/entities/produto.entity";

const AVAILABLE_BOXES = [
  new Caixa('Caixa 1', 30, 40, 80),
  new Caixa('Caixa 2', 50, 50, 40),
  new Caixa('Caixa 3', 50, 80, 60),
];

@Injectable()
export class PedidoEmpacotamentoUseCase  {
  public execute(pedido: Pedido) {
    const products = [...pedido.produtos].sort((a, b) => b.volume - a.volume);
    const resultaCaixas: (Caixa | ProdutoSemCaixa)[] = [];


    for (const prod of products) {
      let placed = false;
      for (const rb of resultaCaixas) {
        if (rb instanceof Caixa && rb.addProduto(prod)) {
          placed = true;
          break;
        }
      }


      if (!placed) {
        const pcx = AVAILABLE_BOXES.filter(b => b.entraCaixa(prod)).sort((a, b) => a.volume - b.volume)[0];
        if (pcx) {
          const novaCaixa = new Caixa(pcx.caixa_id, pcx.altura, pcx.largura, pcx.comprimento);
          novaCaixa.addProduto(prod);
          resultaCaixas.push(novaCaixa);
        } else {
          resultaCaixas.push(new ProdutoSemCaixa(prod));
        }
      }
    }


    return {
      pedido_id: pedido.pedido_id,
      caixas: resultaCaixas.map(b => ({
      caixa_id: b instanceof Caixa ? b.caixa_id : null,
      produtos: b.produtos.map(p => p.produto_id),
      ...(b instanceof ProdutoSemCaixa ? { observacao: b.observacao } : {}),
      })),
    };
  }
}