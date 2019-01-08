import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsController } from './organisations.controller';

describe('Organisations Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrganisationsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OrganisationsController = module.get<OrganisationsController>(OrganisationsController);
    expect(controller).toBeDefined();
  });
});
