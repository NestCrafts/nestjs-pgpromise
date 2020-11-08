<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" />   </a>

</p>

<p align="center">pg-promise Module for Nest framework</p>

<p align="center">
 <a href="https://www.npmjs.com/package/nestjs-pgpromise"><img src="https://github.com/rubiin/nestjs-pgpromise/workflows/CI/badge.svg" alt="CI" /></a> 
<a href="https://img.shields.io/npm/v/nestjs-pgpromise"><img src="https://img.shields.io/npm/v/nestjs-pgpromise" alt="NPM Version" /></a>
<a href="https://img.shields.io/npm/l/nestjs-pgpromise"><img src="https://img.shields.io/npm/l/nestjs-pgpromise" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/nestjs-pgpromise"><img src="https://img.shields.io/npm/dm/nestjs-pgpromise" alt="NPM Downloads" /></a>
  


</p>


<p align="center">
<a href="https://www.buymeacoffee.com/XbgWxt567" target="_blank"><img src="https://i.imgur.com/CahshSS.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

</p>

## Description

This's a [nest-pgpromise](https://github.com/rubiin/nest-pgpromise) module for [Nest](https://github.com/nestjs/nest).
This quickstart guide will show you how to install and execute an example nestjs program..

This document assumes that you have a working [nodejs](http://nodejs.org/) setup in place.

## Download from NPM

```sh
npm install --save nestjs-pgpromise
```

## Initialize

You need five items in order to connect to the PostgreSQL server.

| Params | Description |
| :------- | :------------ |
| host | Host IP address or URL. |
| port | TCP/IP port number to access the database. |
| database | The name of the database to connect to. |
| user | The username to access the database. |
| password | The username's password to access the database. |

And you can use as well all the other parameters allowed by `pg-promise` package. See the [documentation](https://vitaly-t.github.io/pg-promise/index.html).

Provide the credentials for pg-promise module by importing it as :

## As Connection object

```javascript
import { Module } from '@nestjs/common';
import { NestPgpromiseClientController } from './nest-pgpromise-client.controller';
import { NestPgpromiseModule } from 'nestjs-pgpromise';

@Module({
  controllers: [NestPgpromiseClientController],
  imports: [
    NestPgpromiseModule.register({
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'cmdbbtbi',
        user: 'cmadbbtbi',
        password: 'cghQZynG0whwtGki-ci2bpxV5Jw_5k6z',
      },
    }),
  ],
})
export class AppModule {}
```

## As Connection string

```javascript
import { Module } from '@nestjs/common';
import { NestPgpromiseClientController } from './nest-pgpromise-client.controller';
import { NestPgpromiseModule } from 'nestjs-pgpromise';

@Module({
  controllers: [NestPgpromiseClientController],
  imports: [
    NestPgpromiseModule.register({
      connection: "postgres://YourUserName:YourPassword@YourHost:5432/YourDatabase"
    }),
  ],
})
export class AppModule {}
```

Then you can use it in the controller or service by injecting it in the controller as:

```javascript
constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}
```

## Quick Start Example

This example program connects to postgres on localhost and executes a simple `select` query from table `tasks`.

```javascript
import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Controller()
export class NestPgpromiseClientController {
  private logger = new Logger('controller');
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}

  @Get()
  async index() {
    this.pg
      .any('SELECT * FROM task')
      .then(data => {
        // success;
        this.logger.log(data);
      })
      .catch(error => {
        // error;
        this.logger.log(error);
      });
  }
}
```

As `pg-promise` methods return promises, the new `async/await` syntaxis can be used.

```javascript
import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Controller()
export class NestPgpromiseClientController {
  private logger = new Logger('controller');
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}

  @Get()
  async index() {
    try {
      const data = await this.pg.any('SELECT * FROM task');
      // success;
      this.logger.log(data);
    } catch(e) {
      // error;
      this.logger.log(error);
    }
  }
}
```

You can also pass in `initoptions` as supported by pg-promise. 

```javascript
import { Module } from '@nestjs/common';
import { NestPgpromiseClientController } from './nest-pgpromise-client.controller';
import { NestPgpromiseModule } from 'nestjs-pgpromise';

@Module({
  controllers: [NestPgpromiseClientController],
  imports: [
    NestPgpromiseModule.register({
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'cmdbbtbi',
        user: 'cmadbbtbi',
        password: 'cghQZynG0whwtGki-ci2bpxV5Jw_5k6z',
      },
      initOptions:{/* initialization options */};
    }),
  ],
})
export class AppModule {}
```

You can find the details about them in the [pg-promise](https://vitaly-t.github.io/pg-promise/index.html) documentation

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://vitalytomilov.com"><img src="https://avatars1.githubusercontent.com/u/5108906?v=4" width="100px;" alt=""/><br /><sub><b>Vitaly Tomilov</b></sub></a><br /><a href="#infra-vitaly-t" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/rubiin/nestjs-pgpromise/commits?author=vitaly-t" title="Tests">⚠️</a> <a href="https://github.com/rubiin/nestjs-pgpromise/commits?author=vitaly-t" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.mattclemente.com"><img src="https://avatars0.githubusercontent.com/u/5348419?v=4" width="100px;" alt=""/><br /><sub><b>Matthew J. Clemente</b></sub></a><br /><a href="#infra-mjclemente" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/rubiin/nestjs-pgpromise/commits?author=mjclemente" title="Tests">⚠️</a> <a href="https://github.com/rubiin/nestjs-pgpromise/commits?author=mjclemente" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nythrox"><img src="https://avatars2.githubusercontent.com/u/41273690?v=4" width="100px;" alt=""/><br /><sub><b>Jason Santiago</b></sub></a><br /><a href="https://github.com/rubiin/nestjs-pgpromise/commits?author=nythrox" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
