import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Regiao } from '../typeorm/regiao.entity';
import { Cidade } from '../typeorm/cidade.entity';
import { RegiaoCidadeService } from './regiao-cidade.service';

@Controller('regiao-cidade')
export class RegiaoCidadeController {
  constructor(private readonly regiaoCidadeService: RegiaoCidadeService) {}

  @Get('regioes')
  getAllRegioes(): Promise<Regiao[]> {
    return this.regiaoCidadeService.getAllRegioes();
  }

  @Get('regioes/:regiaoId')
  getRegiaoById(@Param('regiaoId') regiaoId: string): Promise<Regiao> {
    return this.regiaoCidadeService.getRegiaoById(regiaoId);
  }

  @Post('regioes')
  createRegiao(@Body() regiao: Regiao): Promise<Regiao> {
    return this.regiaoCidadeService.createRegiao(regiao);
  }

  @Put('regioes/:regiaoId')
  updateRegiao(
    @Param('regiaoId') regiaoId: string,
    @Body() updatedRegiao: Regiao,
  ): Promise<Regiao> {
    return this.regiaoCidadeService.updateRegiao(regiaoId, updatedRegiao);
  }

  @Delete('regioes/:regiaoId')
  deleteRegiao(@Param('regiaoId') regiaoId: string): Promise<void> {
    return this.regiaoCidadeService.deleteRegiao(regiaoId);
  }

  @Get('cidades/:regiaoId')
  async getCidadesByRegiao(@Param('regiaoId') regiaoId: string) {
    return this.regiaoCidadeService.getCidadesByRegiao(regiaoId);
  }

  @Get('cidades')
  getAllCidades(): Promise<Cidade[]> {
    return this.regiaoCidadeService.getAllCidades();
  }

  @Get('cidades/:cidadeId')
  getCidadeById(@Param('cidadeId') cidadeId: string): Promise<Cidade> {
    return this.regiaoCidadeService.getCidadeById(cidadeId);
  }

  @Post('cidades')
  createCidade(@Body() cidade: Cidade): Promise<Cidade> {
    return this.regiaoCidadeService.createCidade(cidade);
  }

  @Put('cidades/:cidadeId')
  updateCidade(
    @Param('cidadeId') cidadeId: string,
    @Body() updatedCidade: Cidade,
  ): Promise<Cidade> {
    return this.regiaoCidadeService.updateCidade(cidadeId, updatedCidade);
  }

  @Delete('cidades/:cidadeId')
  deleteCidade(@Param('cidadeId') cidadeId: string): Promise<void> {
    return this.regiaoCidadeService.deleteCidade(cidadeId);
  }
}
