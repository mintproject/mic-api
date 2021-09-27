import {Entity, model, property} from '@loopback/repository';

@model()
export class Input extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id: string;

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
  })
  description?: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'string',
  })
  modelId?: string;

  @property({
    type: 'string',
  })
  prefix?: string;

  constructor(data?: Partial<Input>) {
    super(data);
  }
}

export interface InputRelations {
  // describe navigational properties here
}

export type InputWithRelations = Input & InputRelations;
