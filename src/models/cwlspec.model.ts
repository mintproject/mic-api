import {Entity, model, property} from '@loopback/repository';


@model()
export class Cwlspec extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
  })
  class: string;

  @property({
    type: 'string',
  })
  baseCommand: string;

  @property({
    type: 'string',
  })
  cwlVersion: string;

  @property({
    type: 'object',
  })
  hints: object;

  @property({
    type: 'object',
  })
  inputs: object;

  @property({
    type: 'object',
  })
  outputs: object;

  @property({
    type: 'object',
  })
  requirements: object;

  @property({
    type: 'array',
    itemType: 'string'
  })
  arguments: string[]

  @property({
    type: 'string',
  })
  modelId?: string;

  constructor(data?: Partial<Cwlspec>) {
    super(data);
  }
}

export interface CwlspecRelations {
  // describe navigational properties here
}

export type CwlspecWithRelations = Cwlspec & CwlspecRelations;
