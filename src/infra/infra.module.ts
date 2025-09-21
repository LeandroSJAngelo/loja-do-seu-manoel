import { Module } from '@nestjs/common';
import { PedidoController } from './controller/pedido.controller';
import { EmpacotarSerivce } from './service/empacotar.service';
import { ApiKeyGuard } from './seguranca/api-key.guard';
import { UsecasesModule } from 'src/use-cases/usecases.module';


@Module({
  imports: [UsecasesModule],
  controllers: [PedidoController],
  providers: [EmpacotarSerivce, ApiKeyGuard],
})
export class IfraModule {}
