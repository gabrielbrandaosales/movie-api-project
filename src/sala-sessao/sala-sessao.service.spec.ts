import { Test, TestingModule } from '@nestjs/testing';
import { SalaSessaoService } from './sala-sessao.service';

describe('SalaSessaoService', () => {
  let service: SalaSessaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaSessaoService],
    }).compile();

    service = module.get<SalaSessaoService>(SalaSessaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
