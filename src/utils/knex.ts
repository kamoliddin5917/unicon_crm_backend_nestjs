import { knex } from 'knex';
import CONFIG from '../config';

class KnexService {
  instance: any;
  readInstance: any;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      debug: false,
      connection: CONFIG.DB_URL,
      pool: {
        min: 1,
        max: Number(process.env.MAX_POOL) || 75,
      },
    });

    this.readInstance = knex({
      client: 'postgresql',
      debug: false,
      connection: {
        host: process.env.READ_PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: Number(process.env.READ_PGPORT),
        application_name: `president_assignment ${new Date().getTime()}`,
      },
      pool: {
        min: 1,
        max: Number(process.env.MAX_POOL) || 75,
      },
    });
  }
}

export default new KnexService();
