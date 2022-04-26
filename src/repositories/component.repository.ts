import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Component, ComponentRelations, Parameter, Directive, Input, Output, GitRepo} from '../models';
import {ParameterRepository} from './parameter.repository';
import {DirectiveRepository} from './directive.repository';
import {InputRepository} from './input.repository';
import {OutputRepository} from './output.repository';
import {GitRepoRepository} from './git-repo.repository';

export class ComponentRepository extends DefaultCrudRepository<
  Component,
  typeof Component.prototype.id,
  ComponentRelations
> {

  public readonly parameters: HasManyRepositoryFactory<Parameter, typeof Component.prototype.id>;

  public readonly directives: HasManyRepositoryFactory<Directive, typeof Component.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Component.prototype.id>;

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Component.prototype.id>;

  public readonly gitRepo: HasOneRepositoryFactory<GitRepo, typeof Component.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParameterRepository') protected parameterRepositoryGetter: Getter<ParameterRepository>, @repository.getter('DirectiveRepository') protected directiveRepositoryGetter: Getter<DirectiveRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>, @repository.getter('GitRepoRepository') protected gitRepoRepositoryGetter: Getter<GitRepoRepository>,
  ) {
    super(Component, dataSource);
    this.gitRepo = this.createHasOneRepositoryFactoryFor('gitRepo', gitRepoRepositoryGetter);
    this.registerInclusionResolver('gitRepo', this.gitRepo.inclusionResolver);
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
