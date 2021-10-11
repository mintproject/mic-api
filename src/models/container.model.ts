import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Container extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'date',
  })
  launched_at?: string;

  @property({
    type: 'string',
  })
  host?: string;

  @property({
    type: 'string',
  })
  modelId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Container>) {
    super(data);
  }
}

export interface ContainerRelations {
  // describe navigational properties here
}

export type ContainerWithRelations = Container & ContainerRelations;
