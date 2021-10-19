import {Entity, model, property} from '@loopback/repository';

@model()
export class Container extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
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
    type: 'Number',
  })
  port?: Number;

  @property({
    type: 'string',
  })
  docker_id?: string;

  @property({
    type: 'string',
  })
  modelId?: string;



  constructor(data?: Partial<Container>) {
    super(data);
  }
}

export interface ContainerRelations {
  // describe navigational properties here
}

export type ContainerWithRelations = Container & ContainerRelations;
