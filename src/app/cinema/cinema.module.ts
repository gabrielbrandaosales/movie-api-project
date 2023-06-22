import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from './entity/cinema.entity';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { Cidade } from 'src/typeorm/cidade.entity';
import { Regiao } from 'src/typeorm/regiao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema, Cidade, Regiao])],
  providers: [CinemaService],
  controllers: [CinemaController],
})
export class CinemaModule {}
