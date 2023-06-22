import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { Cinema } from './entity/cinema.entity';
import { createCinemaDTO } from './dtos/createCinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get('cidade/:cidadeId')
  async getCinemasByCidade(@Param('cidadeId') cidadeId: string) {
    const cinemas = await this.cinemaService.getCinemasByCidade(cidadeId);
    return cinemas;
  }

  @Get('regiao/:regiaoId')
  async getCinemasByRegiao(@Param('regiaoId') regiaoId: string) {
    const cinemas = await this.cinemaService.getCinemasByRegiao(regiaoId);
    return { cinemas };
  }

  @Get()
  async getAllCinemas(): Promise<Cinema[]> {
    return this.cinemaService.findAllCinemas();
  }

  @Get(':id')
  async getCinemaById(@Param('id') id: string): Promise<Cinema> {
    return this.cinemaService.findCinemaById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async createCinema(@Body() cinemaData: createCinemaDTO): Promise<Cinema> {
    const cinema = await this.cinemaService.createCinema(cinemaData);
    return cinema;
  }

  @Put(':id')
  async updateCinema(
    @Param('id') id: string,
    @Body() cinemaData: Partial<Cinema>,
  ): Promise<Cinema> {
    return this.cinemaService.updateCinema(id, cinemaData);
  }

  @Delete(':id')
  async deleteCinema(@Param('id') id: string): Promise<void> {
    return this.cinemaService.deleteCinema(id);
  }
}
