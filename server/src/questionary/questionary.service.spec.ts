import { Test, TestingModule } from '@nestjs/testing';
import { QuestionaryService } from './questionary.service';

describe('QuestionaryService', () => {
  let service: QuestionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionaryService],
    }).compile();

    service = module.get<QuestionaryService>(QuestionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
