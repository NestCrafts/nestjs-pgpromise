import { Module } from '@nestjs/common';
import { NestPgpromiseService } from './nest-pgpromise.service';
import { ConfigurableModuleClass } from './nest-pgpromise-module.definition';
import { connectionFactory } from './nest-pgpromise-connection.provider';

@Module({
  providers: [NestPgpromiseService, connectionFactory],
  exports: [NestPgpromiseService, connectionFactory],
})
export class NestPgpromiseModule extends ConfigurableModuleClass {}
