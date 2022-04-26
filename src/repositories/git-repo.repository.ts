import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GitRepo, GitRepoRelations} from '../models';

export class GitRepoRepository extends DefaultCrudRepository<
  GitRepo,
  typeof GitRepo.prototype.id,
  GitRepoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(GitRepo, dataSource);
  }
}
