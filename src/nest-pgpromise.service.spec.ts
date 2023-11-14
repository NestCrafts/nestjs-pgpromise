import { Test, TestingModule } from '@nestjs/testing';
import { NestPgpromiseService } from './nest-pgpromise.service';

describe('NestPgpromiseService', () => {
  
  let service: NestPgpromiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: NestPgpromiseService,
          useFactory: () => {
            return new NestPgpromiseService({
              connection: {
                port: 5432,
                database: 'postgres',
                user: 'postgres',
                password: 'postgres',
              }
            })
          }
        }
        
        
      ],
    }).compile();

    service = module.get<NestPgpromiseService>(NestPgpromiseService);
  });

  afterEach(() => {
    service.getMain().end();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('select one', async () => {
    const connection = await service.getPg();
    const result = await connection.one('SELECT 1;');
    expect(result).toEqual({ '?column?': 1 });
  });
});
