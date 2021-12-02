import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Output, OutputRelations} from '../models';

export class OutputRepository extends DefaultCrudRepository<
  Output,
  typeof Output.prototype.id,
  OutputRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Output, dataSource);
  }
}
