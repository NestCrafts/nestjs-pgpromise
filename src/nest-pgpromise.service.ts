import { Injectable, Inject, Logger } from '@nestjs/common';
import * as pg from 'pg-promise';
import { NestPgpromiseOptions } from './nest-pgpromise-options.interface';
import { MODULE_OPTIONS_TOKEN } from './nest-pgpromise-module.definition';

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
    @Inject(MODULE_OPTIONS_TOKEN)
    private _NestPgpromiseOptions: NestPgpromiseOptions,
  ) {
    this.logger = new Logger('NestPgpromiseService');
  }
  getMain(): pg.IMain {
    if (!this._pgMain) {
      const initOptions = {
        ...this._NestPgpromiseOptions.initOptions,
        ...{
          error(error, e) {
            if (e.cn) {
              this.logger.error('EVENT:', error.message || error);
            }
          },
        },
      };

      const pgp = pg(initOptions);
      this._pgMain = pgp;
    }
    return this._pgMain;
  }

  async getPg(): Promise<pg.IDatabase<{}>> {
    if (!this._pgConnection) {
      this._pgConnection = this.getMain()(
        this._NestPgpromiseOptions.connection,
      );
    }
    return this._pgConnection;
  }
}
