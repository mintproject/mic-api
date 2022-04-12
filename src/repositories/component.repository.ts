import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Component, ComponentRelations, Parameter, Directive, Input, Output} from '../models';
import {ParameterRepository} from './parameter.repository';
import {DirectiveRepository} from './directive.repository';
import {InputRepository} from './input.repository';
import {OutputRepository} from './output.repository';

export class ComponentRepository extends DefaultCrudRepository<
  Component,
  typeof Component.prototype.id,
  ComponentRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Component.prototype.id>;

  public readonly directives: HasManyRepositoryFactory<Directive, typeof Component.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Component.prototype.id>;

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Component.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>,
  ) {
    super(Component, dataSource);
    this.outputs = this.createHasManyRepositoryFactoryFor('outputs', outputRepositoryGetter,);
    this.registerInclusionResolver('outputs', this.outputs.inclusionResolver);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
    this.directives = this.createHasManyRepositoryFactoryFor('directives', directiveRepositoryGetter,);
    this.registerInclusionResolver('directives', this.directives.inclusionResolver);
    this.parameters = this.createHasManyRepositoryFactoryFor('parameters', parameterRepositoryGetter,);
    this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
  }
}
