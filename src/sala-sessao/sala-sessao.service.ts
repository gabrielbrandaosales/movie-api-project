import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Sala } from '../typeorm/sala.entity';
import { Sessao } from '../typeorm/sessao.entity';
import { Cinema } from 'src/app/cinema/entity/cinema.entity';
import { Filme } from 'src/app/movie/entity/movie.entity';

@Injectable()
export class SalaSessaoService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
    @InjectRepository(Sessao)
    private readonly sessaoRepository: Repository<Sessao>,
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) {}

  // Métodos para Sala

  async getSalasByCinema(cinemaId: string): Promise<Sala[]> {
    //Valida se existe cinema com esse ID
    const cinema = await this.cinemaRepository.findOne({
      where: { cinemaId },
    });
    if (!cinema) throw new NotFoundException('Esse cinema não existe');

    //Traz as salas com base no cinemaId
    const salas = await this.salaRepository.find({
      where: { cinema: { cinemaId: cinemaId } },
      relations: ['cinema'], // Carrega a entidade relacionada 'cinema'
    });

    if (!salas.length) {
      throw new NotFoundException(
        'Nenhuma sala encontrada para o cinema especificado.',
      );
    }

    return salas;
  }

  async findAllSalas(): Promise<Sala[]> {
    return this.salaRepository.find();
  }

  async findSalaById(id: string): Promise<Sala> {
    const options: FindOneOptions<Sala> = { where: { id } };
    return this.salaRepository.findOne(options);
  }

  async createSala(
    salaData: Partial<{ nome: string; cinemaId: string }>,
  ): Promise<Sala> {
    const { nome, cinemaId } = salaData;
    // Verificar se a cinema existe
    const cinema = await this.cinemaRepository.findOne({
      where: { cinemaId },
    });
    if (!cinema) throw new NotFoundException('Cinema não encontrado.');

    const sala = new Sala();
    sala.nome = nome;
    sala.cinema = cinema;

    return this.salaRepository.save(sala);
  }

  async updateSala(id: string, salaData: Partial<Sala>): Promise<Sala> {
    await this.salaRepository.update(id, salaData);
    const salaAtualizada = await this.salaRepository.findOne({
      where: { id },
    });
    return salaAtualizada;
  }

  async deleteSala(id: string): Promise<void> {
    await this.salaRepository.delete(id);
  }

  // Métodos para Sessao

  async findSessaoBySala(salaId: string): Promise<Sessao[]> {
    //Valida se existe sala com esse ID
    const sala = await this.salaRepository.findOne({
      where: { id: salaId },
    });
    if (!sala) throw new NotFoundException('Essa sala não existe');

    //Traz as sessoes com base no salaId
    const sessoes = await this.sessaoRepository.find({
      where: { sala: { id: salaId } },
      relations: ['sala'], // Carrega a entidade relacionada 'sala'
    });

    if (!sessoes.length) {
      throw new NotFoundException(
        'Nenhuma sessao encontrada para a sala especificada.',
      );
    }

    return sessoes;
  }

  async findSessaoByFilme(filmeId: string): Promise<Sessao[]> {
    //Valida se existe filme com esse ID
    const filme = await this.filmeRepository.findOne({
      where: { filmeId },
    });
    if (!filme) throw new NotFoundException('Esse filme não existe');

    //Traz as sessoes com base no filmeId
    const sessoes = await this.sessaoRepository.find({
      where: { filme: { filmeId } },
      relations: ['filme'], // Carrega a entidade relacionada 'filme'
    });

    if (!sessoes.length) {
      throw new NotFoundException(
        'Nenhuma sessao encontrada para o filme especificado.',
      );
    }

    return sessoes;
  }

  async findAllSessoes(): Promise<Sessao[]> {
    return this.sessaoRepository.find();
  }

  async findSessaoById(id: string): Promise<Sessao> {
    const options: FindOneOptions<Sessao> = { where: { id } };
    return this.sessaoRepository.findOne(options);
  }

  async createSessao(
    sessaoData: Partial<{ horario: string; salaId: string; filmeId: string }>,
  ): Promise<Sessao> {
    const { horario, salaId, filmeId } = sessaoData;

    //Validação salaId
    const sala = await this.salaRepository.findOne({ where: { id: salaId } });
    if (!sala) throw new NotFoundException('Essa sala não existe');
    //Validação filmeId
    const filme = await this.filmeRepository.findOne({
      where: { filmeId },
    });
    if (!filme) throw new NotFoundException('Esse filme não existe');

    //Atribuição de dados
    const sessao = new Sessao();
    sessao.horario = horario;
    sessao.sala = sala;
    sessao.filme = filme;
    return this.sessaoRepository.save(sessao);
  }

  async updateSessao(id: string, sessaoData: Partial<Sessao>): Promise<Sessao> {
    await this.sessaoRepository.update(id, sessaoData);
    const sessaoAtualizada = await this.sessaoRepository.findOne({
      where: { id },
    });
    return sessaoAtualizada;
  }

  async deleteSessao(id: string): Promise<void> {
    await this.sessaoRepository.delete(id);
  }
}
