import { NestPgpromiseService } from './nest-pgpromise.service';

export const NEST_PGPROMISE_CONNECTION = 'NEST_PGPROMISE_CONNECTION';

export const connectionFactory = {
  provide: NEST_PGPROMISE_CONNECTION,
  useFactory: async (nestPgpromiseService) => {
    return await nestPgpromiseService.getPg();
  },
  inject: [NestPgpromiseService],
};
