import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Model, ModelRelations, Parameter, Directive} from '../models';
import {ParameterRepository} from './parameter.repository';
import {DirectiveRepository} from './directive.repository';

export class ModelRepository extends DefaultCrudRepository<
  Model,
  typeof Model.prototype.id,
  ModelRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Model.prototype.id>;

  public readonly directive: HasOneRepositoryFactory<Directive, typeof Model.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>,
  ) {
    super(Model, dataSource);
    this.directive = this.createHasOneRepositoryFactoryFor('directive', directiveRepositoryGetter);
    this.registerInclusionResolver('directive', this.directive.inclusionResolver);
    this.parameters = this.createHasManyRepositoryFactoryFor('parameters', parameterRepositoryGetter,);
    this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
  }
}
