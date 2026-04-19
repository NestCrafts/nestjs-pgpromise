import { Inject, Injectable, Logger } from '@nestjs/common';
import pgPromise, {
  IDatabase,
  IEventContext,
  IMain,
  IInitOptions,
} from 'pg-promise';
import { MODULE_OPTIONS_TOKEN } from './nest-pgpromise-module.definition';
import { NestPgpromiseOptions } from './nest-pgpromise-options.interface';

interface INestPgpromiseService {
  getPg(): Promise<IDatabase<any>>;
  getMain(): IMain;
}

@Injectable()
export class NestPgpromiseService implements INestPgpromiseService {
  private _pgConnection?: Promise<IDatabase<any>>;
  private _pgMain?: IMain;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private _NestPgpromiseOptions: NestPgpromiseOptions,
  ) {}

  getMain(): IMain {
    if (!this._pgMain) {
      const initOptions: IInitOptions = {
        ...this._NestPgpromiseOptions.initOptions,
        ...{
          error(error: Error, e: IEventContext) {
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

      const pgp = pgPromise(initOptions);
      this._pgMain = pgp;
    }
    return this._pgMain;
  }

  async getPg(): Promise<IDatabase<any>> {
    if (!this._pgConnection) {
      if (!this._NestPgpromiseOptions.connection) {
        throw new Error('NestPgpromiseOptions.connection is required');
      }
      this._pgConnection = this.getMain()(
        this._NestPgpromiseOptions.connection,
      );
    }
    return this._pgConnection;
  }

  onModuleDestroy() {
    if (this._pgMain) {
      this._pgMain.end();
    }
  }
}
