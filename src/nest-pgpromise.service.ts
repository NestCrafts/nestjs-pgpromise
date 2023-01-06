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
  private _pgConnection: Promise<pg.IDatabase<{}>>;
  private _pgMain: pg.IMain;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private _NestPgpromiseOptions: NestPgpromiseOptions,
  ) {}
  getMain(): pg.IMain {
    if (!this._pgMain) {
      const initOptions = {
        ...this._NestPgpromiseOptions.initOptions,
        ...{
          error(error: Error, e: pg.IEventContext) {
            const logger = new Logger('NestPgpromiseService');
            /** Connection related error */
            if (e.cn) {
              logger.error(`CONNECTION ERROR: ${error.message || error}`);
            }
            /** Query was present during error */
            if (e.query) {
              logger.error(`QUERY ERROR: ${error.message || error}`);
              logger.error(`QUERY: ${e.query}`);
            }
            /** Error occurred inside a tagged task or transaction */
            if (e.ctx && e.ctx.tag) {
              logger.error(`TRANSACTION ERROR TAG: ${e.ctx.tag}`);
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
