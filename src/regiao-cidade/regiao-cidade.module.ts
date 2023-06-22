import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regiao } from '../typeorm/regiao.entity';
import { Cidade } from '../typeorm/cidade.entity';
import { RegiaoCidadeController } from './regiao-cidade.controller';
import { RegiaoCidadeService } from './regiao-cidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regiao, Cidade])],
  controllers: [RegiaoCidadeController],
  providers: [RegiaoCidadeService],
})
export class RegiaoCidadeModule {}
