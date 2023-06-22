import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sala } from './sala.entity';
import { Filme } from 'src/app/movie/entity/movie.entity';

@Entity()
export class Sessao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  horario: string;

  @ManyToOne(() => Sala, (sala) => sala.sessoes, { nullable: false })
  @JoinColumn({ name: 'sala_id' })
  sala: Sala;

  @ManyToOne(() => Filme, (filme) => filme.sessoes, { nullable: false })
  @JoinColumn({ name: 'filme_id' })
  filme: Filme;
}
