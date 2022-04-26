import {Entity, model, property} from '@loopback/repository';

@model()
export class Notebook extends Entity {
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
  })
  localPath?: string;

  @property({
    type: 'string',
  })
  remotePath?: string;

  @property({
    type: 'string',
    required: true,
  })
  inferredBy: string;

  @property({
    type: 'string',
  })
  spec?: string;

  @property({
    type: 'string',
  })
  gitRepoId?: string;

  constructor(data?: Partial<Notebook>) {
    super(data);
  }
}

export interface NotebookRelations {
  // describe navigational properties here
}

export type NotebookWithRelations = Notebook & NotebookRelations;
