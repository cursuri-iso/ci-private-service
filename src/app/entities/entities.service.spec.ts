import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesService } from './entities.service';
import { SharedModule } from '../../shared/shared.module';

describe('EntitiesService', () => {
  let service: EntitiesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [EntitiesService],
    }).compile();
    service = module.get<EntitiesService>(EntitiesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
