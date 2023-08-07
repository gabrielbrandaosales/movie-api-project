import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Regiao } from '../typeorm/regiao.entity';
import { Cidade } from '../typeorm/cidade.entity';
import { RegiaoCidadeService } from './regiao-cidade.service';
import { createCidadeDTO } from './dtos/createCidade.dto';

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
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async createSessao(@Body() cidadeData: createCidadeDTO): Promise<Cidade> {
    console.log(cidadeData);

    return this.regiaoCidadeService.createCidade(
      cidadeData as unknown as Cidade,
    );
  }

  // @Post('cidades')
  // createCidade(@Body() cidade: Cidade) {
  //   const createdCity = this.regiaoCidadeService.createCidade(cidade);
  //   console.log('criou a cidade');
  //   console.log(createdCity);

  //   return cidade;
  // }

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
