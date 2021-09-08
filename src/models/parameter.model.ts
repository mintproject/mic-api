import {Entity, model, property} from '@loopback/repository';

@model()
export class Parameter extends Entity {
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
  display_name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

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
    required: true,
  })
  data_type: string;

  @property({
    type: 'any',
    required: true,
  })
  default: any;

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


  constructor(data?: Partial<Parameter>) {
    super(data);
  }
}

export interface ParameterRelations {
  // describe navigational properties here
}

export type ParameterWithRelations = Parameter & ParameterRelations;
