import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import { IInitOptions } from 'pg-promise';

export interface NestPgpromiseOptions {
  connection?: IConnectionParameters | string;
  initOptions?: IInitOptions;
}
