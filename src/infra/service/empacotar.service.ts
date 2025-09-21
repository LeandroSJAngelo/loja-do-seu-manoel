import { Pedido } from "src/domain/entities/pedido.entity";
import { Produto } from "src/domain/entities/produto.entity";
import { PedidoEmpacotamentoUseCase } from "src/use-cases/pedido-empacotamento.usecase";
import { PedidoDto } from "../dto/pedido.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmpacotarSerivce {
  constructor(private packOrderUseCase: PedidoEmpacotamentoUseCase) {}

  public empacotarPedidos(pedidosDtos: PedidoDto[]) {
    const pedidos = pedidosDtos.map(orderDto => {
      const products = orderDto.produtos.map(p =>
        new Produto(p.produto_id, p.dimensoes.altura, p.dimensoes.largura, p.dimensoes.comprimento)
      );
      return new Pedido(orderDto.pedido_id, products);
    });

    // Agora o UseCase recebe as entidades de domínio, não DTOs
    return pedidos.map(order => this.packOrderUseCase.execute(order));
  }
}