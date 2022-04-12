import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Input, InputRelations} from '../models';

export class InputRepository extends DefaultCrudRepository<
  Input,
  typeof Input.prototype.id,
  InputRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Input, dataSource);
  }
}
