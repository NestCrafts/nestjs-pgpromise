// tslint:disable: variable-name
import { Injectable, Inject, Logger } from '@nestjs/common';
import { NEST_PGPROMISE_OPTIONS } from './constants';
import { NestPgpromiseOptions } from './interfaces';
import * as pg from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

interface INestPgpromiseService {
  getPg(): Promise<pg.IDatabase<{}>>;
  getMain(): pg.IMain;
}

@Injectable()
export class NestPgpromiseService implements INestPgpromiseService {
  private readonly logger: Logger;
  private _pgConnection: Promise<pg.IDatabase<{}>>;
  private _pgMain: pg.IMain;
  constructor(
    @Inject(NEST_PGPROMISE_OPTIONS)
    private _NestPgpromiseOptions: NestPgpromiseOptions,
  ) {
    this.logger = new Logger('NestPgpromiseService');
  }
  getMain(): pg.IMain {
    if (!this._pgMain) {
      const self = this;
      const initOptions = {
        ...this._NestPgpromiseOptions.initOptions,
        ...{
          error(error, e) {
            if (e.cn) {
              self.logger.error('EVENT:', error.message || error);
            }
          },
        },
      };

      const pgp = pg(initOptions);
      this._pgMain = pgp;
      return this._pgMain;
    }
  }

  async getPg(): Promise<pg.IDatabase<{}>> {
    if (!this._pgConnection) {
      this._pgConnection = this._pgMain(this._NestPgpromiseOptions.connection);
    }
    return this._pgConnection;
  }
}
