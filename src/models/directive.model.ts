import {Entity, model, property} from '@loopback/repository';

@model()
export class Directive extends Entity {
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
  command: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'boolean',
    required: true,
  })
  added: boolean;

  @property({
    type: 'string',
  })
  componentId?: string;

  constructor(data?: Partial<Directive>) {
    super(data);
  }
}

export interface DirectiveRelations {
  // describe navigational properties here
}

export type DirectiveWithRelations = Directive & DirectiveRelations;
