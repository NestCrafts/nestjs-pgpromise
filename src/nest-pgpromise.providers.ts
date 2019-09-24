import { NestPgpromiseOptions } from './interfaces';

import { NEST_PGPROMISE_OPTIONS } from './constants';

export function createNestPgpromiseProviders(options: NestPgpromiseOptions) {
  return [
    {
      provide: NEST_PGPROMISE_OPTIONS,
      useValue: options,
    },
  ];
}
