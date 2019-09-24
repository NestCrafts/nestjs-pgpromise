// tslint:disable: variable-name
import { Injectable, Inject, Logger } from '@nestjs/common';
import { NEST_PGPROMISE_OPTIONS } from './constants';
import { NestPgpromiseOptions } from './interfaces';
import * as pg from 'pg-promise';

interface INestPgpromiseService {
  getPg(): Promise<any>;
}

@Injectable()
export class NestPgpromiseService implements INestPgpromiseService {
  private readonly logger: Logger;
  private _pgConnection: any;
  constructor(
    @Inject(NEST_PGPROMISE_OPTIONS)
    private _NestPgpromiseOptions: NestPgpromiseOptions,
  ) {
    this.logger = new Logger('NestPgpromiseService');
    this.logger.log(`Options: ${JSON.stringify(this._NestPgpromiseOptions)}`);
  }

  async getPg(): Promise<any> {
    if (!this._pgConnection) {
      const pgp = pg(this._NestPgpromiseOptions.initOptions);
      this._pgConnection = pgp(this._NestPgpromiseOptions.connection);
    }
    return this._pgConnection;
  }
}
