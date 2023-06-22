import { Sessao } from 'src/typeorm/sessao.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Filme {
  @PrimaryGeneratedColumn('uuid')
  filmeId: string;

  @Column()
  titulo: string;

  @Column()
  duracao: number;

  @Column()
  genero: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relação One-to-Many com Sessao
  @OneToMany(() => Sessao, (sessao) => sessao.filme)
  sessoes: Sessao[];
}
