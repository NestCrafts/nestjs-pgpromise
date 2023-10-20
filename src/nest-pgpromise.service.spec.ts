import { Test, TestingModule } from '@nestjs/testing';
import { NestPgpromiseService } from './nest-pgpromise.service';
import { NestPgpromiseModule } from './nest-pgpromise.module';

describe('NestPgpromiseService', () => {
  let module: TestingModule;
  let service: NestPgpromiseService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        NestPgpromiseModule.register({
          connection: {
            port: 5432,
            database: 'postgres',
            user: 'postgres',
            password: 'postgres',
          },
        }),
      ],
      providers: [],
    }).compile();

    service = module.get<NestPgpromiseService>(NestPgpromiseService);
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('select one', async () => {
    const connection = await service.getPg();
    const result = await connection.one('SELECT 1');
    expect(result).toEqual({ '?column?': 1 });
  });
});
