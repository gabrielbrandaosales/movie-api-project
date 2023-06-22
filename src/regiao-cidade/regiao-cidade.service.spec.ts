import { Test, TestingModule } from '@nestjs/testing';
import { RegiaoCidadeService } from './regiao-cidade.service';

describe('RegiaoCidadeService', () => {
  let service: RegiaoCidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegiaoCidadeService],
    }).compile();

    service = module.get<RegiaoCidadeService>(RegiaoCidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
