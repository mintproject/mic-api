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
  GitRepo,
  Notebook,
} from '../models';
import {GitRepoRepository} from '../repositories';

export class GitRepoNotebookController {
  constructor(
    @repository(GitRepoRepository) protected gitRepoRepository: GitRepoRepository,
  ) { }

  @get('/git-repos/{id}/notebooks', {
    responses: {
      '200': {
        description: 'Array of GitRepo has many Notebook',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notebook)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notebook>,
  ): Promise<Notebook[]> {
    return this.gitRepoRepository.notebooks(id).find(filter);
  }

  @post('/git-repos/{id}/notebooks', {
    responses: {
      '200': {
        description: 'GitRepo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notebook)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof GitRepo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notebook, {
            title: 'NewNotebookInGitRepo',
            exclude: ['id'],
            optional: ['gitRepoId']
          }),
        },
      },
    }) notebook: Omit<Notebook, 'id'>,
  ): Promise<Notebook> {
    return this.gitRepoRepository.notebooks(id).create(notebook);
  }

  @patch('/git-repos/{id}/notebooks', {
    responses: {
      '200': {
        description: 'GitRepo.Notebook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notebook, {partial: true}),
        },
      },
    })
    notebook: Partial<Notebook>,
    @param.query.object('where', getWhereSchemaFor(Notebook)) where?: Where<Notebook>,
  ): Promise<Count> {
    return this.gitRepoRepository.notebooks(id).patch(notebook, where);
  }

  @del('/git-repos/{id}/notebooks', {
    responses: {
      '200': {
        description: 'GitRepo.Notebook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notebook)) where?: Where<Notebook>,
  ): Promise<Count> {
    return this.gitRepoRepository.notebooks(id).delete(where);
  }
}
