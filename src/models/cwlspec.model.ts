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
    type: 'object',
    required: true,
  })
  spec: object;

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
