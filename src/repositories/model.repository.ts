import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Directive, Input, Model, ModelRelations, Parameter, Container, Cwlspec, Output} from '../models';
import {DirectiveRepository} from './directive.repository';
import {InputRepository} from './input.repository';
import {ParameterRepository} from './parameter.repository';
import {ContainerRepository} from './container.repository';
import {CwlspecRepository} from './cwlspec.repository';
import {OutputRepository} from './output.repository';

export class ModelRepository extends DefaultCrudRepository<
  Model,
  typeof Model.prototype.id,
  ModelRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Model.prototype.id>;

  public readonly directive: HasOneRepositoryFactory<Directive, typeof Model.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Model.prototype.id>;

  public readonly containers: HasManyRepositoryFactory<Container, typeof Model.prototype.id>;

  public readonly container: HasOneRepositoryFactory<Container, typeof Model.prototype.id>;

  public readonly directives: HasManyRepositoryFactory<Directive, typeof Model.prototype.id>;

  public readonly cwlspec: HasOneRepositoryFactory<Cwlspec, typeof Model.prototype.id>;

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Model.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>, @repository.getter('ContainerRepository') protected containerRepositoryGetter: Getter<ContainerRepository>, @repository.getter('CwlspecRepository') protected cwlspecRepositoryGetter: Getter<CwlspecRepository>, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>,
  ) {
    super(Model, dataSource);
    this.outputs = this.createHasManyRepositoryFactoryFor('outputs', outputRepositoryGetter,);
    this.registerInclusionResolver('outputs', this.outputs.inclusionResolver);
    this.cwlspec = this.createHasOneRepositoryFactoryFor('cwlspec', cwlspecRepositoryGetter);
    this.registerInclusionResolver('cwlspec', this.cwlspec.inclusionResolver);
    this.directives = this.createHasManyRepositoryFactoryFor('directives', directiveRepositoryGetter,);
    this.registerInclusionResolver('directives', this.directives.inclusionResolver);
    this.container = this.createHasOneRepositoryFactoryFor('container', containerRepositoryGetter);
    this.registerInclusionResolver('container', this.container.inclusionResolver);
    this.containers = this.createHasManyRepositoryFactoryFor('containers', containerRepositoryGetter,);
    this.registerInclusionResolver('containers', this.containers.inclusionResolver);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
    this.directive = this.createHasOneRepositoryFactoryFor('directive', directiveRepositoryGetter);
    this.registerInclusionResolver('directive', this.directive.inclusionResolver);
    this.parameters = this.createHasManyRepositoryFactoryFor('parameters', parameterRepositoryGetter,);
    this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
  }
}
