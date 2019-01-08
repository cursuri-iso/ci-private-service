import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesController } from './entities.controller';

describe('Entities Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EntitiesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EntitiesController = module.get<EntitiesController>(EntitiesController);
    expect(controller).toBeDefined();
  });
});
