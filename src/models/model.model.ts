import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Directive} from './directive.model';
import {Parameter} from './parameter.model';

@model()
export class Model extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    defaultFn: 'uuid',
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
