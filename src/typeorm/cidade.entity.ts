import { Cinema } from 'src/app/cinema/entity/cinema.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Regiao } from './regiao.entity';

@Entity()
export class Cidade {
  @PrimaryGeneratedColumn('uuid')
  cidadeId?: string;

  @Column()
  nome: string;

  // Relação Many-to-One com Regiao
  @ManyToOne(() => Regiao, (regiao) => regiao.cidades, { nullable: false })
  @JoinColumn({ name: 'regiao_id' })
  regiao: Regiao;

  // Relação One-to-Many com Cinema
  @OneToMany(() => Cinema, (cinema) => cinema.cidade)
  cinemas: Cinema[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
