import {
  Module,
  DynamicModule,
  Provider,
  Global,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import { NestPgpromiseService } from './nest-pgpromise.service';
import { NEST_PGPROMISE_OPTIONS, NEST_PGPROMISE_CONNECTION } from './constants';
import {
  NestPgpromiseOptions,
  NestPgpromiseAsyncOptions,
  NestPgpromiseOptionsFactory,
} from './interfaces';
import { createNestPgpromiseProviders } from './nest-pgpromise.providers';
import { connectionFactory } from './nest-pgpromise-connection.provider';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  providers: [NestPgpromiseService, connectionFactory],
  exports: [NestPgpromiseService, connectionFactory],
})
export class NestPgpromiseModule implements OnApplicationShutdown {
  constructor(
    @Inject(NEST_PGPROMISE_OPTIONS)
    private readonly options: NestPgpromiseOptions,
    @Inject(NEST_PGPROMISE_CONNECTION)
    private readonly pg,
    private readonly moduleRef: ModuleRef,
  ) {}

  /**
   * Registers a configured NestPgpromise Module for import into the current module
   */
  public static register(options: NestPgpromiseOptions): DynamicModule {
    return {
      module: NestPgpromiseModule,
      providers: createNestPgpromiseProviders(options),
    };
  }

  /**
   * Registers a configured NestPgpromise Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(
    options: NestPgpromiseAsyncOptions,
  ): DynamicModule {
    return {
      module: NestPgpromiseModule,
      providers: [...this.createProviders(options)],
      imports: options.imports || [],
    };
  }

  private static createProviders(
    options: NestPgpromiseAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestPgpromiseAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_PGPROMISE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: NEST_PGPROMISE_OPTIONS,
      useFactory: async (optionsFactory: NestPgpromiseOptionsFactory) =>
        await optionsFactory.createNestPgpromiseOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  async onApplicationShutdown() {
    // an option could be added to keepConnectionAlive
    // if (this.options.keepConnectionAlive) {
    //   return;
    // }

    await this.pg.$pool.end();
  }
}
