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
  Model,
  Container,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelContainerController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/containers', {
    responses: {
      '200': {
        description: 'Array of Model has many Container',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Container)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Container>,
  ): Promise<Container[]> {
    return this.modelRepository.containers(id).find(filter);
  }

  @post('/models/{id}/containers', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Container)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Container, {
            title: 'NewContainerInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) container: Omit<Container, 'id'>,
  ): Promise<Container> {
    return this.modelRepository.containers(id).create(container);
  }

  @patch('/models/{id}/containers', {
    responses: {
      '200': {
        description: 'Model.Container PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Container, {partial: true}),
        },
      },
    })
    container: Partial<Container>,
    @param.query.object('where', getWhereSchemaFor(Container)) where?: Where<Container>,
  ): Promise<Count> {
    return this.modelRepository.containers(id).patch(container, where);
  }

  @del('/models/{id}/containers', {
    responses: {
      '200': {
        description: 'Model.Container DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Container)) where?: Where<Container>,
  ): Promise<Count> {
    return this.modelRepository.containers(id).delete(where);
  }
}
