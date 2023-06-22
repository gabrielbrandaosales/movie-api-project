import { Test, TestingModule } from '@nestjs/testing';
import { RegiaoCidadeController } from './regiao-cidade.controller';

describe('RegiaoCidadeController', () => {
  let controller: RegiaoCidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegiaoCidadeController],
    }).compile();

    controller = module.get<RegiaoCidadeController>(RegiaoCidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
