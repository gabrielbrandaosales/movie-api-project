import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Cinema } from './entity/cinema.entity';
import { Cidade } from 'src/typeorm/cidade.entity';
import { Regiao } from 'src/typeorm/regiao.entity';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
    @InjectRepository(Regiao)
    private readonly regiaoRepository: Repository<Regiao>,
  ) {}

  async getCinemasByCidade(cidadeId: string): Promise<Cinema[]> {
    //Valida se existe cidade com esse ID
    const cityExist = await this.cidadeRepository.findOne({
      where: { cidadeId },
    });
    if (!cityExist) throw new NotFoundException('Essa cidade não existe');

    //Traz os cinemas com base no cidadeId
    const cinemas = await this.cinemaRepository.find({
      where: { cidade: { cidadeId: cidadeId } },
      relations: ['cidade'], // Carrega a entidade relacionada 'cidade'
    });

    if (!cinemas.length) {
      throw new NotFoundException(
        'Nenhum cinema encontrado para a cidade especificada.',
      );
    }

    return cinemas;
  }

  async getCinemasByRegiao(regiaoId: string): Promise<Cinema[]> {
    //Valida se existe regiao com esse ID
    const regionExist = await this.regiaoRepository.findOne({
      where: { regiaoId },
    });
    if (!regionExist) throw new NotFoundException('Essa região não existe');

    //Traz os cinemas na região especificada
    const cinemas = await this.cinemaRepository.find({
      where: { regiao: { regiaoId } },
    });

    if (!cinemas.length) {
      throw new NotFoundException(
        'Nenhum cinema encontrado para a região especificada.',
      );
    }

    return cinemas;
  }

  async findAllCinemas(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }

  async findCinemaById(cinemaId: string): Promise<Cinema> {
    const options: FindOneOptions<Cinema> = { where: { cinemaId } };
    return this.cinemaRepository.findOneOrFail(options);
  }

  async createCinema(
    cinemaData: Partial<{ nome: string; cidadeId: string; regiaoId: string }>,
  ): Promise<Cinema> {
    const { nome, cidadeId, regiaoId } = cinemaData;

    // Verificar se a cidade existe
    const cidade = await this.cidadeRepository.findOne({
      where: { cidadeId },
    });
    if (!cidade) throw new NotFoundException('Cidade não encontrada.');

    // Verificar se a região existe
    const regiao = await this.regiaoRepository.findOne({
      where: { regiaoId },
    });
    if (!regiao) throw new NotFoundException('Região não encontrada.');

    // Criar o cinema
    const cinema = new Cinema();
    cinema.nome = nome;
    cinema.cidade = cidade;
    cinema.regiao = regiao;

    return this.cinemaRepository.save(cinema);
  }

  async createCinemaF(cinemaData: Partial<Cinema>, cidadeId): Promise<Cinema> {
    // Verificar se a cidade existe
    const city = await this.cidadeRepository.findOne(cidadeId);
    if (!city) throw new NotFoundException('Cidade não encontrada.');

    // Criar o cinema
    const cinema = this.cinemaRepository.create({ ...cinemaData });
    city.cinemas = [...city.cinemas, cinema];
    return this.cinemaRepository.save(cinema);
  }

  async updateCinema(
    cinemaId: string,
    cinemaData: Partial<Cinema>,
  ): Promise<Cinema> {
    await this.cinemaRepository.update(cinemaId, cinemaData);
    const cinemaAtualizada = await this.cinemaRepository.findOne({
      where: { cinemaId },
    });
    return cinemaAtualizada;
  }

  async deleteCinema(id: string): Promise<void> {
    await this.cinemaRepository.delete(id);
  }
}
