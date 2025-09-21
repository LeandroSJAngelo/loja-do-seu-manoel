import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, ValidateNested } from "class-validator";
import { DimensoesDto } from "./dimensoes.dto";

export class ProdutoDto {
  @ApiProperty({ example: 'PS5', description: 'ID do produto' })
  @IsString()
  @IsNotEmpty()
  produto_id: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}