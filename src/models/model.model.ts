import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Parameter} from './parameter.model';
import {Directive} from './directive.model';

@model()
export class Model extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => Parameter)
  parameters: Parameter[];

  @hasOne(() => Directive)
  directive: Directive;

  constructor(data?: Partial<Model>) {
    super(data);
  }
}

export interface ModelRelations {
  // describe navigational properties here
}

export type ModelWithRelations = Model & ModelRelations;
