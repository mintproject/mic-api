import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Parameter, ParameterRelations} from '../models';

export class ParameterRepository extends DefaultCrudRepository<
  Parameter,
  typeof Parameter.prototype.id,
  ParameterRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Parameter, dataSource);
  }
}
