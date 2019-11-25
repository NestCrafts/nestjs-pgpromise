export interface NestPgpromiseOptions {
  connection?:
    | {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
        ssl?: boolean;
        binary?: boolean;
        client_encoding?: string;
        application_name?: string;
        fallback_application_name?: string;
        idleTimeoutMillis?: number;
        max?: number;
        query_timeout?: number;
        keepAlive?: boolean;
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
