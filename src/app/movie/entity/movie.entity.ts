import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Filme {
  @PrimaryGeneratedColumn('uuid')
  filme_id: string;

  @Column()
  titulo: string;

  @Column()
  duracao: string;

  @Column()
  genero: string;

  @Column()
  descricao: string;
}
