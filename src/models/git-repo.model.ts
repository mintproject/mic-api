import {Entity, model, property} from '@loopback/repository';

@model()
export class GitRepo extends Entity {
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
  url: string;

  @property({
    type: 'string',
  })
  ref?: string;

  @property({
    type: 'string',
  })
  dockerImage?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  notebooks?: string[];


  constructor(data?: Partial<GitRepo>) {
    super(data);
  }
}

export interface GitRepoRelations {
  // describe navigational properties here
}

export type GitRepoWithRelations = GitRepo & GitRepoRelations;
