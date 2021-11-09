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
  Cwlspec,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelCwlspecController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/cwlspec', {
    responses: {
      '200': {
        description: 'Model has one Cwlspec',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cwlspec),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cwlspec>,
  ): Promise<Cwlspec> {
    return this.modelRepository.cwlspec(id).get(filter);
  }

  @post('/models/{id}/cwlspec', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cwlspec)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cwlspec, {
            title: 'NewCwlspecInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) cwlspec: Omit<Cwlspec, 'id'>,
  ): Promise<Cwlspec> {
    return this.modelRepository.cwlspec(id).create(cwlspec);
  }

  @patch('/models/{id}/cwlspec', {
    responses: {
      '200': {
        description: 'Model.Cwlspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cwlspec, {partial: true}),
        },
      },
    })
    cwlspec: Partial<Cwlspec>,
    @param.query.object('where', getWhereSchemaFor(Cwlspec)) where?: Where<Cwlspec>,
  ): Promise<Count> {
    return this.modelRepository.cwlspec(id).patch(cwlspec, where);
  }

  @del('/models/{id}/cwlspec', {
    responses: {
      '200': {
        description: 'Model.Cwlspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cwlspec)) where?: Where<Cwlspec>,
  ): Promise<Count> {
    return this.modelRepository.cwlspec(id).delete(where);
  }
}
