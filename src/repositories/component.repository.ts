import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Component, ComponentRelations} from '../models';

export class ComponentRepository extends DefaultCrudRepository<
  Component,
  typeof Component.prototype.id,
  ComponentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Component, dataSource);
  }
}
