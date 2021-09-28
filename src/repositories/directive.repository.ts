import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Directive, DirectiveRelations} from '../models';

export class DirectiveRepository extends DefaultCrudRepository<
  Directive,
  typeof Directive.prototype.id,
  DirectiveRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Directive, dataSource);
  }
}
