import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Directive} from './directive.model';
import {Input} from './input.model';
import {Output} from './output.model';
import {Parameter} from './parameter.model';
import {GitRepo} from './git-repo.model';

enum ComponentType {
  CWL = "cwl",
  DOCKER = "docker"
}

@model()
export class Component extends Entity {
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

  @hasMany(() => Input)
  inputs: Input[];

  @hasMany(() => Output)
  outputs: Output[];

  @hasOne(() => GitRepo)
  gitRepo: GitRepo;

  constructor(data?: Partial<Component>) {
    super(data);
  }
}

export interface ComponentRelations {
  // describe navigational properties here
}

export type ComponentWithRelations = Component & ComponentRelations;
