import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parameter} from './parameter.model';
import {Directive} from './directive.model';

enum ComponentType {
  CWL = "cwl",
  DOCKER = "docker"
}

@model()
export class Component extends Entity {
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
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(ComponentType),
      default: ComponentType.CWL
    },
  })
  type?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @hasMany(() => Parameter)
  parameters: Parameter[];

  @hasMany(() => Directive)
  directives: Directive[];

  constructor(data?: Partial<Component>) {
    super(data);
  }
}

export interface ComponentRelations {
  // describe navigational properties here
}

export type ComponentWithRelations = Component & ComponentRelations;
