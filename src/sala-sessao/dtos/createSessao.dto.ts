import { IsUUID, IsNotEmpty } from 'class-validator';

export class createSessaoDTO {
  @IsUUID('4', { message: 'O campo salaId deve ser um UUID válido.' })
  salaId: string;

  @IsUUID('4', { message: 'O campo filmeId deve ser um UUID válido.' })
  filmeId: string;

  // outras propriedades do DTO@IsString()
  @IsNotEmpty()
  horario: string;
}
