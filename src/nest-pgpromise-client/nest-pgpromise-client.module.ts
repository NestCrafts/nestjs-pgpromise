import { Module } from '@nestjs/common';
import { NestPgpromiseClientController } from './nest-pgpromise-client.controller';
import { NestPgpromiseModule } from '../nest-pgpromise.module';

@Module({
  controllers: [NestPgpromiseClientController],
  imports: [
    NestPgpromiseModule.register({
      connection: {
        host: 'raja.db.elephantsql.com',
        port: 5432,
        database: 'cmdbbtbi',
        user: 'cmdbbtbi',
        password: 'cghQZynG0whwtGki-ci2bpxV5Jw_5k6z',
      },
    }),
  ],
})
export class NestPgpromiseClientModule {}
