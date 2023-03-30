import { Inject } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from './nest-pgpromise-connection.provider';

export const InjectPgPromise = (): ReturnType<typeof Inject> =>
  Inject(NEST_PGPROMISE_CONNECTION);
