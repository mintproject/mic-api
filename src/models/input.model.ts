import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Input extends Entity {
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
  displayName: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'string',
    required: true,
  })
  prefix: string;

  @property({
    type: 'string',
  })
  componentId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Input>) {
    super(data);
  }
}

export interface InputRelations {
  // describe navigational properties here
}

export type InputWithRelations = Input & InputRelations;
