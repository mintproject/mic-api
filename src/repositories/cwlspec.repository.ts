import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cwlspec, CwlspecRelations} from '../models';

export class CwlspecRepository extends DefaultCrudRepository<
  Cwlspec,
  typeof Cwlspec.prototype.id,
  CwlspecRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cwlspec, dataSource);
  }
}
