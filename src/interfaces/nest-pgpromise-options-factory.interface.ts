import { NestPgpromiseOptions } from './nest-pgpromise-options.interface';

export interface NestPgpromiseOptionsFactory {
  createNestPgpromiseOptions():
    | Promise<NestPgpromiseOptions>
    | NestPgpromiseOptions;
}
