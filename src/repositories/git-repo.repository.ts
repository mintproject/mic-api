import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GitRepo, GitRepoRelations, Notebook} from '../models';
import {NotebookRepository} from './notebook.repository';

export class GitRepoRepository extends DefaultCrudRepository<
  GitRepo,
  typeof GitRepo.prototype.id,
  GitRepoRelations
> {

  public readonly notebooks: HasManyRepositoryFactory<Notebook, typeof GitRepo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('NotebookRepository') protected notebookRepositoryGetter: Getter<NotebookRepository>,
  ) {
    super(GitRepo, dataSource);
    this.notebooks = this.createHasManyRepositoryFactoryFor('notebooks', notebookRepositoryGetter,);
    this.registerInclusionResolver('notebooks', this.notebooks.inclusionResolver);
  }
}
