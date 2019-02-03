import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesController } from './entities.controller';
import { SharedModule } from '../../shared/shared.module';
import { EntitiesService } from './entities.service';

describe('Entities Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [EntitiesService],
      controllers: [EntitiesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EntitiesController = module.get<EntitiesController>(EntitiesController);
    expect(controller).toBeDefined();
  });
});
