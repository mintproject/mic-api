import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Component,
  GitRepo,
} from '../models';
import {ComponentRepository} from '../repositories';

export class ComponentGitRepoController {
  constructor(
    @repository(ComponentRepository) protected componentRepository: ComponentRepository,
  ) { }

  @get('/components/{id}/git-repo', {
    responses: {
      '200': {
        description: 'Component has one GitRepo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GitRepo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<GitRepo>,
  ): Promise<GitRepo> {
    return this.componentRepository.gitRepo(id).get(filter);
  }

  @post('/components/{id}/git-repo', {
    responses: {
      '200': {
        description: 'Component model instance',
        content: {'application/json': {schema: getModelSchemaRef(GitRepo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Component.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GitRepo, {
            title: 'NewGitRepoInComponent',
            exclude: ['id'],
            optional: ['componentId']
          }),
        },
      },
    }) gitRepo: Omit<GitRepo, 'id'>,
  ): Promise<GitRepo> {
    return this.componentRepository.gitRepo(id).create(gitRepo);
  }

  @patch('/components/{id}/git-repo', {
    responses: {
      '200': {
        description: 'Component.GitRepo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GitRepo, {partial: true}),
        },
      },
    })
    gitRepo: Partial<GitRepo>,
    @param.query.object('where', getWhereSchemaFor(GitRepo)) where?: Where<GitRepo>,
  ): Promise<Count> {
    return this.componentRepository.gitRepo(id).patch(gitRepo, where);
  }

  @del('/components/{id}/git-repo', {
    responses: {
      '200': {
        description: 'Component.GitRepo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GitRepo)) where?: Where<GitRepo>,
  ): Promise<Count> {
    return this.componentRepository.gitRepo(id).delete(where);
  }
}
