import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Notebook, NotebookRelations} from '../models';

export class NotebookRepository extends DefaultCrudRepository<
  Notebook,
  typeof Notebook.prototype.id,
  NotebookRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Notebook, dataSource);
  }
}
