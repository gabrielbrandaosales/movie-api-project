import { Cinema } from 'src/app/cinema/entity/cinema.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Cidade } from './cidade.entity';

@Entity()
export class Regiao {
  @PrimaryGeneratedColumn('uuid')
  regiaoId: string;

  @Column()
  nome: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relação One-to-Many com Cidade
  @OneToMany(() => Cidade, (cidade) => cidade.regiao)
  cidades: Cinema[];

  // Relação One-to-Many com Cinema
  @OneToMany(() => Cinema, (cinema) => cinema.cidade)
  cinemas: Cinema[];
}
