import {Entity, model, property} from '@loopback/repository';

@model()
export class Parameter extends Entity {
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
  display_name?: string;

  @property({
    type: 'string',
    description: "The type of parameter",
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    nullable: true
  })
  unit?: string;

  @property({
    type: 'string',
    nullable: true
  })
  unit_description?: string;

  @property({
    type: 'string',
    description: "Describes whether the data values will be categorical, ordered, or numerical",
    nullable: true
  })
  data_type?: string;

  @property({
    type: 'any',
    nullable: true
  })
  default?: any;

  @property({
    type: 'array',
    itemType: 'string',
    nullable: true
  })
  choices?: string[];

  @property({
    type: 'number',
    nullable: true
  })
  min?: number;

  @property({
    type: 'number',
    nullable: true
  })
  max?: number;

  @property({
    type: 'string',
  })
  modelId?: string;


  @property({
    type: 'string',
    nullable: true
  })
  prefix?: string;

  constructor(data?: Partial<Parameter>) {
    super(data);
  }
}

export interface ParameterRelations {
  // describe navigational properties here
}

export type ParameterWithRelations = Parameter & ParameterRelations;
