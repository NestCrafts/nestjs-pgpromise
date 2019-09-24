export interface NestPgpromiseOptions {
  connection?:
    | {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
      }
    | string;
  initOptions?: {
    pgFormatting?: boolean;
    pgNative?: boolean;
    promiseLib?: object;
    noLocking?: boolean;
    capSQL?: boolean;
    noWarnings?: boolean;
    schema?: string;
    connect?(): any;
    disconnect?(): any;
    query?(): any;
    receive?(): any;
    task?(): any;
    transact?(): any;
    error?(): any;
    extend?(): any;
  };
}
