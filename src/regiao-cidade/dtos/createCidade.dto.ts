import { IsUUID, IsNotEmpty } from 'class-validator';

export class createCidadeDTO {
  // outras propriedades do DTO@IsString()
  @IsNotEmpty()
  nome: string;

  @IsUUID('4', { message: 'O campo regiao deve ser um UUID válido.' })
  @IsNotEmpty()
  regiao: string;
}
