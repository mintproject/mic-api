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
    type: 'string',
  })
  modelId?: string;

  @property({
    type: 'date',
    defaultFn: "now",
  })
  created_at: Date;

  @property({
    type: 'boolean',
    default: false
  })
  added: boolean;

  constructor(data?: Partial<Directive>) {
    super(data);
  }
}

export interface DirectiveRelations {
  // describe navigational properties here
}

export type DirectiveWithRelations = Directive & DirectiveRelations;
