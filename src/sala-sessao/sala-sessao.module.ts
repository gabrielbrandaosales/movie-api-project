import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from '../typeorm/sala.entity';
import { Sessao } from '../typeorm/sessao.entity';
import { SalaSessaoController } from './sala-sessao.controller';
import { SalaSessaoService } from './sala-sessao.service';
import { Cinema } from 'src/app/cinema/entity/cinema.entity';
import { Filme } from 'src/app/movie/entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sala, Sessao, Cinema, Filme])],
  controllers: [SalaSessaoController],
  providers: [SalaSessaoService],
})
export class SalaSessaoModule {}
