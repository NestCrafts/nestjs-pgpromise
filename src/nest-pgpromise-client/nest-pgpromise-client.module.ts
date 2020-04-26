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
        password: 'UTZll9erU8Q4Nf8EK4Twb2KFeTgVPUxp',
      },
      initOptions: {},
    }),
  ],
})
export class NestPgpromiseClientModule {}
