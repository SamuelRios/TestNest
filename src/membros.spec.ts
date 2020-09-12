import { Test, TestingModule } from '@nestjs/testing';
import { Membros } from './membros';

describe('Membros', () => {
  let provider: Membros;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Membros],
    }).compile();

    provider = module.get<Membros>(Membros);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
