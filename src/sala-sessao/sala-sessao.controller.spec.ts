import { Test, TestingModule } from '@nestjs/testing';
import { SalaSessaoController } from './sala-sessao.controller';

describe('SalaSessaoController', () => {
  let controller: SalaSessaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaSessaoController],
    }).compile();

    controller = module.get<SalaSessaoController>(SalaSessaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
