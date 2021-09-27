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
  Parameter,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelParameterController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/parameters', {
    responses: {
      '200': {
        description: 'Array of Model has many Parameter',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parameter)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parameter>,
  ): Promise<Parameter[]> {
    return this.modelRepository.parameters(id).find(filter);
  }

  @post('/models/{id}/parameters', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parameter)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {
            title: 'NewParameterInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) parameter: Omit<Parameter, 'id'>,
  ): Promise<Parameter> {
    return this.modelRepository.parameters(id).create(parameter);
  }

  @patch('/models/{id}/parameters', {
    responses: {
      '200': {
        description: 'Model.Parameter PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {partial: true}),
        },
      },
    })
    parameter: Partial<Parameter>,
    @param.query.object('where', getWhereSchemaFor(Parameter)) where?: Where<Parameter>,
  ): Promise<Count> {
    return this.modelRepository.parameters(id).patch(parameter, where);
  }

  @del('/models/{id}/parameters', {
    responses: {
      '200': {
        description: 'Model.Parameter DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parameter)) where?: Where<Parameter>,
  ): Promise<Count> {
    return this.modelRepository.parameters(id).delete(where);
  }
}
