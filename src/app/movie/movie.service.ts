import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { Filme } from './entity/movie.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Filme)
    private readonly movieRepository: Repository<Filme>,
  ) {}

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOneOrFail(filme_id: string) {
    try {
      const options: FindOneOptions<Filme> = { where: { filme_id } };
      return await this.movieRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.movieRepository.save(this.movieRepository.create(data));
  }

  async update(id: string, data) {
    const filme = await this.findOneOrFail(id);
    this.movieRepository.merge(filme, data);
    return await this.movieRepository.save(filme);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);

    await this.movieRepository.softDelete(id);
  }
}
