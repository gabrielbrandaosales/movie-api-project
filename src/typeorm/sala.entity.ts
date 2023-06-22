import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sessao } from './sessao.entity';
import { Cinema } from 'src/app/cinema/entity/cinema.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  // Relação One-to-Many com Sessão
  @OneToMany(() => Sessao, (sessao) => sessao.sala)
  sessoes: Sessao[];

  // Relação Many-to-One com Cinema
  @ManyToOne(() => Cinema, (cinema) => cinema.salas, { nullable: false })
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;
}
