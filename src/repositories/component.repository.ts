import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Component, ComponentRelations, Parameter, Directive, Input} from '../models';
import {ParameterRepository} from './parameter.repository';
import {DirectiveRepository} from './directive.repository';
import {InputRepository} from './input.repository';

export class ComponentRepository extends DefaultCrudRepository<
  Component,
  typeof Component.prototype.id,
  ComponentRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Component.prototype.id>;

  public readonly directives: HasManyRepositoryFactory<Directive, typeof Component.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Component.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>,
  ) {
    super(Component, dataSource);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
    this.directives = this.createHasManyRepositoryFactoryFor('directives', directiveRepositoryGetter,);
    this.registerInclusionResolver('directives', this.directives.inclusionResolver);
    this.parameters = this.createHasManyRepositoryFactoryFor('parameters', parameterRepositoryGetter,);
    this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
  }
}
