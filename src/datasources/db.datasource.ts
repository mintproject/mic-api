import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const host = process.env.KUBERNETES_SERVICE_HOST ? process.env.DB_HOST : 'localhost';
const port = process.env.KUBERNETES_SERVICE_HOST ? process.env.DB_PORT : 5432;
const user = process.env.KUBERNETES_SERVICE_HOST ? process.env.DB_USER : 'postgres';
const password = process.env.KUBERNETES_SERVICE_HOST ? process.env.DB_PASSWORD : 'postgres';
const database = process.env.KUBERNETES_SERVICE_HOST ? process.env.DB_DATABASE : 'postgres';

const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host: host,
  port: port,
  user: user,
  password: password,
  database: database
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
