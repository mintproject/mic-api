import {Entity, model, property} from '@loopback/repository';

@model()
export class Directive extends Entity {
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
  command: string;


  constructor(data?: Partial<Directive>) {
    super(data);
  }
}

export interface DirectiveRelations {
  // describe navigational properties here
}

export type DirectiveWithRelations = Directive & DirectiveRelations;
