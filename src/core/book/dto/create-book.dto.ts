import { IsString, IsArray, ValidateNested, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

class FieldDto {
  @IsString({ message: "A tag deve ser uma string" })
  @IsNotEmpty({ message: "A tag é obrigatória" })
  public tag: string;

  @IsArray({ message: "Os indicadores devem ser um array de strings" })
  public indicators: string[];

  @ValidateNested({ message: "Os subcampos devem estar no formato correto" })
  @Type(() => Object)
  public subfields: Record<string, string>;
}

export class CreateBookDto {
  @IsString({ message: "O líder deve ser uma string" })
  @IsNotEmpty({ message: "O líder é obrigatório" })
  public leader: string;

  @IsArray({ message: "Os campos devem ser um array" })
  @IsNotEmpty({ message: "Adicione pelo menos um campo" })
  @ValidateNested({
    each: true,
    message: "Cada campo deve estar no formato correto",
  })
  @Type(() => FieldDto)
  public fields: FieldDto[];
}
