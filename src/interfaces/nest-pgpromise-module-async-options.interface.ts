/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { NestPgpromiseOptions } from './nest-pgpromise-options.interface';
import { NestPgpromiseOptionsFactory } from './nest-pgpromise-options-factory.interface';

export interface NestPgpromiseAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestPgpromiseOptionsFactory>;
  useClass?: Type<NestPgpromiseOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestPgpromiseOptions> | NestPgpromiseOptions;
}
