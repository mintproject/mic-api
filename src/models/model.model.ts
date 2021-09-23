import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Directive} from './directive.model';
import {Input} from './input.model';
import {Parameter} from './parameter.model';

enum ComponentType {
  CWL = 'cwl',
  DOCKER = 'docker',
}

@model()
export class Model extends Entity {
  @property({
    type: 'string',
    id: true,
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


  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(ComponentType),
    },
  })
  type: string;

  @property({
    type: 'object',
    required: false,
  })
  cwl_spec: Object;

  @property({
    type: 'string',
  })
  dockerImage: string

  @property({
    type: 'string',
  })
  path?: string;

  @hasMany(() => Parameter)
  parameters: Parameter[];

  @hasOne(() => Directive)
  directive: Directive;

  @hasMany(() => Input)
  inputs: Input[];

  constructor(data?: Partial<Model>) {
    super(data);
  }
}

export interface ModelRelations {
  // describe navigational properties here
}

export type ModelWithRelations = Model & ModelRelations;
