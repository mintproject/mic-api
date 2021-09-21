import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Directive, Input, Model, ModelRelations, Parameter} from '../models';
import {DirectiveRepository} from './directive.repository';
import {InputRepository} from './input.repository';
import {ParameterRepository} from './parameter.repository';

export class ModelRepository extends DefaultCrudRepository<
  Model,
  typeof Model.prototype.id,
  ModelRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Model.prototype.id>;

  public readonly directive: HasOneRepositoryFactory<Directive, typeof Model.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Model.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>,
  ) {
    super(Model, dataSource);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
    this.directive = this.createHasOneRepositoryFactoryFor('directive', directiveRepositoryGetter);
    this.registerInclusionResolver('directive', this.directive.inclusionResolver);
    this.parameters = this.createHasManyRepositoryFactoryFor('parameters', parameterRepositoryGetter,);
    this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
  }
}
