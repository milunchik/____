import { Test, TestingModule } from '@nestjs/testing';
import { QuestionaryController } from './questionary.controller';

describe('QuestionaryController', () => {
  let controller: QuestionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionaryController],
    }).compile();

    controller = module.get<QuestionaryController>(QuestionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
