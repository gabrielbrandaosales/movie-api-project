import { IsUUID, IsNotEmpty } from 'class-validator';

export class createSalaDTO {
  @IsUUID('4', { message: 'O campo cinemaId deve ser um UUID válido.' })
  cinemaId: string;

  // outras propriedades do DTO@IsString()
  @IsNotEmpty()
  nome: string;
}
