import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Container} from './container.model';
import {Cwlspec} from './cwlspec.model';
import {Directive} from './directive.model';
import {Input} from './input.model';
import {Parameter} from './parameter.model';

enum ComponentType {
  CWL = 'cwl',
  DOCKER = 'docker',
}

@model({settings: {strict: true}})
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
  })
  description?: string;

  @property({
    type: 'string',
  })
  user?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(ComponentType),
    },
  })
  type: string;


  @property({
    type: 'string',
  })
  model_id?: string

  @property({
    type: 'string',
  })
  version_id?: string;


  @property({
    type: 'string',
  })
  docker_image: string

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

  @hasMany(() => Container)
  containers: Container[];

  @hasOne(() => Container)
  container: Container;

  @hasMany(() => Directive)
  directives: Directive[];

  @hasOne(() => Cwlspec)
  cwlspec: Cwlspec;
  [prop: string]: any;

  constructor(data?: Partial<Model>) {
    super(data);
  }
}

export interface ModelRelations {
  // describe navigational properties here
}

export type ModelWithRelations = Model & ModelRelations;
