import {Entity, model, property} from '@loopback/repository';

@model()
export class GitRepo extends Entity {
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
    type: 'string',
  })
  componentId?: string;

  constructor(data?: Partial<GitRepo>) {
    super(data);
  }
}

export interface GitRepoRelations {
  // describe navigational properties here
}

export type GitRepoWithRelations = GitRepo & GitRepoRelations;
