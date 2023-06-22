import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Regiao } from '../typeorm/regiao.entity';
import { Cidade } from '../typeorm/cidade.entity';

@Injectable()
export class RegiaoCidadeService {
  constructor(
    @InjectRepository(Regiao)
    private readonly regiaoRepository: Repository<Regiao>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  async getCidadesByRegiao(regiaoId: string): Promise<Cidade[]> {
    //Valida se existe regiao com esse ID
    const regionExist = await this.regiaoRepository.findOne({
      where: { regiaoId },
    });
    if (!regionExist) throw new NotFoundException('Essa região não existe');

    //Traz cidades na região especificada
    const cidades = await this.cidadeRepository.find({
      where: { regiao: { regiaoId: regiaoId } },
    });

    if (!cidades.length) {
      throw new NotFoundException(
        'Nenhuma cidade encontrada para a região especificada.',
      );
    }

    return cidades;
  }

  async getAllRegioes(): Promise<Regiao[]> {
    return this.regiaoRepository.find();
  }

  async getRegiaoById(regiaoId: string): Promise<Regiao> {
    const options: FindOneOptions<Regiao> = { where: { regiaoId } };
    return this.regiaoRepository.findOneOrFail(options);
  }

  async createRegiao(regiao: Regiao): Promise<Regiao> {
    return this.regiaoRepository.save(regiao);
  }

  async updateRegiao(regiaoId: string, updatedRegiao: Regiao): Promise<Regiao> {
    await this.regiaoRepository.update(regiaoId, updatedRegiao);
    const regiaoAtualizada = await this.regiaoRepository.findOne({
      where: { regiaoId },
    });
    return regiaoAtualizada;
  }

  async deleteRegiao(regiaoId: string): Promise<void> {
    await this.regiaoRepository.delete(regiaoId);
  }

  async getAllCidades(): Promise<Cidade[]> {
    return this.cidadeRepository.find();
  }

  async getCidadeById(cidadeId: string): Promise<Cidade> {
    return this.cidadeRepository.findOneOrFail({ where: { cidadeId } });
  }

  async createCidade(cidade: Cidade): Promise<Cidade> {
    return this.cidadeRepository.save(cidade);
  }

  async updateCidade(cidadeId: string, updatedCidade: Cidade): Promise<Cidade> {
    const cidade = await this.getCidadeById(cidadeId);
    this.cidadeRepository.update(cidadeId, updatedCidade);
    return await this.cidadeRepository.save(cidade);
  }

  async deleteCidade(cidadeId: string): Promise<void> {
    await this.cidadeRepository.delete(cidadeId);
  }
}
