import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestPgpromiseOptions } from './nest-pgpromise-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NestPgpromiseOptions>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
