import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { SalaSessaoService } from './sala-sessao.service';
import { Sala } from '../typeorm/sala.entity';
import { Sessao } from '../typeorm/sessao.entity';
import { createSalaDTO } from './dtos/createSala.dto';
import { createSessaoDTO } from './dtos/createSessao.dto';

@Controller('sala-sessao')
export class SalaSessaoController {
  constructor(private readonly salaSessaoService: SalaSessaoService) {}

  // Rotas para Sala

  @Get('salas/cinema/:cinemaId')
  async getSalasByCinema(@Param('cinemaId') cinemaId: string) {
    return this.salaSessaoService.getSalasByCinema(cinemaId);
  }

  @Get('salas')
  async getAllSalas(): Promise<Sala[]> {
    return this.salaSessaoService.findAllSalas();
  }

  @Get('salas/:id')
  async getSalaById(@Param('id') id: string): Promise<Sala> {
    return this.salaSessaoService.findSalaById(id);
  }

  @Post('salas')
  @UsePipes(ValidationPipe)
  async createSala(@Body() salaData: createSalaDTO): Promise<Sala> {
    return this.salaSessaoService.createSala(salaData);
  }

  @Put('salas/:id')
  async updateSala(
    @Param('id') id: string,
    @Body() salaData: Partial<Sala>,
  ): Promise<Sala> {
    return this.salaSessaoService.updateSala(id, salaData);
  }

  @Delete('salas/:id')
  async deleteSala(@Param('id') id: string): Promise<void> {
    return this.salaSessaoService.deleteSala(id);
  }

  // Rotas para Sessao

  @Get('sessoes/sala/:salaId')
  async getSessoesBySala(@Param('salaId') salaId: string) {
    return this.salaSessaoService.findSessaoBySala(salaId);
  }

  @Get('sessoes/filme/:filmeId')
  async getSessoesByFilme(@Param('filmeId') filmeId: string) {
    return this.salaSessaoService.findSessaoByFilme(filmeId);
  }

  @Get('sessoes')
  async getAllSessoes(): Promise<Sessao[]> {
    return this.salaSessaoService.findAllSessoes();
  }

  @Get('sessoes/:id')
  async getSessaoById(@Param('id') id: string): Promise<Sessao> {
    return this.salaSessaoService.findSessaoById(id);
  }

  @Post('sessoes')
  @UsePipes(ValidationPipe)
  async createSessao(@Body() sessaoData: createSessaoDTO): Promise<Sessao> {
    return this.salaSessaoService.createSessao(sessaoData);
  }

  @Put('sessoes/:id')
  async updateSessao(
    @Param('id') id: string,
    @Body() sessaoData: Partial<Sessao>,
  ): Promise<Sessao> {
    return this.salaSessaoService.updateSessao(id, sessaoData);
  }

  @Delete('sessoes/:id')
  async deleteSessao(@Param('id') id: string): Promise<void> {
    return this.salaSessaoService.deleteSessao(id);
  }
}
