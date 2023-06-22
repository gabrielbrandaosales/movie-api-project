import { Cidade } from 'src/typeorm/cidade.entity';
import { Regiao } from 'src/typeorm/regiao.entity';
import { Sala } from 'src/typeorm/sala.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  cinemaId: string;

  @Column()
  nome: string;

  // Relação Many-to-One com Cidade
  @ManyToOne(() => Cidade, (cidade) => cidade.cinemas, { nullable: false })
  @JoinColumn({ name: 'cidade_id' })
  cidade: Cidade;

  // Relação Many-to-One com Regiao
  @ManyToOne(() => Regiao, (regiao) => regiao.cinemas, { nullable: false })
  @JoinColumn({ name: 'regiao_id' })
  regiao: Regiao;

  // Relação One-to-Many com Sala
  @OneToMany(() => Sala, (sala) => sala.cinema)
  salas: Sala[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
