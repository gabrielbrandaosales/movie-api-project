import { IsNotEmpty } from 'class-validator';

export class createFilmeDTO {
  // propriedades do DTO@IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  duracao: number;

  @IsNotEmpty()
  genero: string;

  @IsNotEmpty()
  descricao: string;
}
