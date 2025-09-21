import { Module } from '@nestjs/common';
import { PedidoEmpacotamentoUseCase } from './pedido-empacotamento.usecase';


@Module({
  imports: [],
  providers: [PedidoEmpacotamentoUseCase],
  exports: [PedidoEmpacotamentoUseCase],
})
export class UsecasesModule {}
