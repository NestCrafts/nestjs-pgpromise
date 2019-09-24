import { NEST_PGPROMISE_CONNECTION } from './constants';
import { NestPgpromiseService } from './nest-pgpromise.service';

export const connectionFactory = {
  provide: NEST_PGPROMISE_CONNECTION,
  useFactory: async nestPgpromiseService => {
    return await nestPgpromiseService.getPg();
  },
  inject: [NestPgpromiseService],
};
