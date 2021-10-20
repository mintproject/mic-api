import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Container, Model
} from '../models';
import {ModelRepository} from '../repositories';
import {createContainer} from './docker-utils';

export class ModelContainerController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/container', {
    responses: {
      '200': {
        description: 'Model has one Container',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Container),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Container>,
  ): Promise<Container> {
    return this.modelRepository.container(id).get(filter);
  }

  @post('/models/{id}/container', {
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
    const docker_container = await createContainer(container.image)
    container.host = docker_container.host
    container.docker_id = docker_container.id
    container.port = docker_container.port
    console.log(container)
    return this.modelRepository.container(id).create(container);
  }

  @patch('/models/{id}/container', {
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
    return this.modelRepository.container(id).patch(container, where);
  }

  @del('/models/{id}/container', {
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
    return this.modelRepository.container(id).delete(where);
  }
}
