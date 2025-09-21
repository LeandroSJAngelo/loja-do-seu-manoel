import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiKeyGuard } from "../seguranca/api-key.guard";
import { PedidoEmpacotamentoDto } from "../dto/pedido-empacotamento.dto";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PedidoEmpacotamentoUseCase } from "src/use-cases/pedido-empacotamento.usecase";
import { EmpacotarSerivce } from "../service/empacotar.service";

@ApiTags('Pedido Empacotamento')
@ApiHeader({ name: 'x-api-key', /* ... */ })
@UseGuards(ApiKeyGuard)
@Controller('pedido')
export class PedidoController {
  constructor(private readonly empacotar: EmpacotarSerivce) {}

  @Post('empacotar')
  @ApiOperation({ summary: 'Processa uma lista de pedidos e determina o empacotamento' })
  @ApiResponse({
    status: 200,
    description: 'Processamento concluído com sucesso.',
    schema: {
      example: {
        "pedidos": [
          {
            "pedido_id": 1,
            "caixas": [{ "caixa_id": "Caixa 2", "produtos": ["PS5", "Volante"] }]
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  empacotarPedido(@Body() pedidoEmpacotamentoDto: PedidoEmpacotamentoDto) {
    return this.empacotar.empacotarPedidos(pedidoEmpacotamentoDto.pedidos);
  }
}