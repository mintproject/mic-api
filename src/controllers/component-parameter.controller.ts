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
  Parameter,
} from '../models';
import {ComponentRepository} from '../repositories';

export class ComponentParameterController {
  constructor(
    @repository(ComponentRepository) protected componentRepository: ComponentRepository,
  ) { }

  @get('/components/{id}/parameters', {
    responses: {
      '200': {
        description: 'Array of Component has many Parameter',
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
    return this.componentRepository.parameters(id).find(filter);
  }

  @post('/components/{id}/parameters', {
    responses: {
      '200': {
        description: 'Component model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parameter)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Component.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {
            title: 'NewParameterInComponent',
            exclude: ['id'],
            optional: ['componentId']
          }),
        },
      },
    }) parameter: Omit<Parameter, 'id'>,
  ): Promise<Parameter> {
    return this.componentRepository.parameters(id).create(parameter);
  }

  @patch('/components/{id}/parameters', {
    responses: {
      '200': {
        description: 'Component.Parameter PATCH success count',
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
    return this.componentRepository.parameters(id).patch(parameter, where);
  }

  @del('/components/{id}/parameters', {
    responses: {
      '200': {
        description: 'Component.Parameter DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parameter)) where?: Where<Parameter>,
  ): Promise<Count> {
    return this.componentRepository.parameters(id).delete(where);
  }
}
