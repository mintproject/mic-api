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
  })
  unit?: string;

  @property({
    type: 'string',
  })
  unit_description?: string;

  @property({
    type: 'string',
    description: "Describes whether the data values will be categorical, ordered, or numerical",
  })
  data_type?: string;

  @property({
    type: 'any',
  })
  default?: any;

  @property({
    type: 'array',
    itemType: 'string',
  })
  choices?: string[];

  @property({
    type: 'number',
  })
  min?: number;

  @property({
    type: 'number',
  })
  max?: number;

  @property({
    type: 'string',
  })
  modelId?: string;


  @property({
    type: 'string',
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
