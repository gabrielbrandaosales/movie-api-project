import { IsUUID, IsNotEmpty } from 'class-validator';

export class createCinemaDTO {
  @IsUUID('4', { message: 'O campo cidadeId deve ser um UUID válido.' })
  cidadeId: string;

  @IsUUID('4', { message: 'O campo regiaoId deve ser um UUID válido.' })
  regiaoId: string;

  // outras propriedades do DTO@IsString()
  @IsNotEmpty()
  nome: string;
}
