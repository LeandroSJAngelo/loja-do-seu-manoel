import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsPositive, ValidateNested } from "class-validator";
import { ProdutoDto } from "./produto.dto";

export class PedidoDto {
  @ApiProperty({ example: 1, name: 'pedido_id' })
  @IsInt()
  @IsPositive()
  pedido_id: number;

  @ApiProperty({ type: [ProdutoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}