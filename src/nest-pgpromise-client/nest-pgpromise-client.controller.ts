import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from '../constants';

@Controller()
export class NestPgpromiseClientController {
  private logger = new Logger('controller');
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg) {}

  @Get()
  async index() {
    this.pg
      .any('SELECT * FROM task')
      .then((data) => {
        // success;
        this.logger.log(data);
      })
      .catch((error) => {
        // error;
        this.logger.log(error);
      });
  }
}
