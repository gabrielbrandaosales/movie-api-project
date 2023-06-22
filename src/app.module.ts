import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './app/movie/movie.module';
import { CinemaModule } from './app/cinema/cinema.module';
import { RegiaoCidadeModule } from './regiao-cidade/regiao-cidade.module';
import { SalaSessaoModule } from './sala-sessao/sala-sessao.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      ssl: { rejectUnauthorized: true },
    }),
    MovieModule,
    CinemaModule,
    RegiaoCidadeModule,
    SalaSessaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
