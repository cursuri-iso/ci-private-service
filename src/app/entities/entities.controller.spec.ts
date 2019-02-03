import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as mocks from 'node-mocks-http';
import * as faker from 'faker';

import { EntitiesController } from './entities.controller';
import { SharedModule } from '../../shared/shared.module';
import { EntitiesService } from './entities.service';
import * as models from '../models';
import { DomainDto } from '../models';

describe('Entities Controller', () => {
  let module: TestingModule;
  let controller: EntitiesController;
  let service: EntitiesService;
  const domains: DomainDto[] = [];
  const req = mocks.createRequest();
  const resp = mocks.createResponse();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [EntitiesService],
      controllers: [EntitiesController],
    }).compile();

    controller = module.get<EntitiesController>(EntitiesController);

    for (let i = 0; i < 1000; i++) {
      domains.push({ name: faker.commerce.department() });
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of domains', async () => {
    service = module.get<EntitiesService>(EntitiesService);
    jest.spyOn(service, 'getEntities').mockImplementation(() => domains);

    await controller.getDomains(resp);
    const data = JSON.parse(resp._getData());

    expect(resp.statusCode).toBe(HttpStatus.OK);
    expect(resp.get('x-pagination')).not.toBeNull();
    expect(domains).toEqual(data);
  });
});
