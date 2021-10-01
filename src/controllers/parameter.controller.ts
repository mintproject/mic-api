import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Parameter} from '../models';
import {ParameterRepository} from '../repositories';

export class ParameterController {
  constructor(
    @repository(ParameterRepository)
    public parameterRepository : ParameterRepository,
  ) {}

  @post('/parameters')
  @response(200, {
    description: 'Parameter model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parameter)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {
            title: 'NewParameter',
            exclude: ['id'],
          }),
        },
      },
    })
    parameter: Omit<Parameter, 'id'>,
  ): Promise<Parameter> {
    return this.parameterRepository.create(parameter);
  }

  @get('/parameters/count')
  @response(200, {
    description: 'Parameter model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parameter) where?: Where<Parameter>,
  ): Promise<Count> {
    return this.parameterRepository.count(where);
  }

  @get('/parameters')
  @response(200, {
    description: 'Array of Parameter model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parameter, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parameter) filter?: Filter<Parameter>,
  ): Promise<Parameter[]> {
    return this.parameterRepository.find(filter);
  }

  @patch('/parameters')
  @response(200, {
    description: 'Parameter PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {partial: true}),
        },
      },
    })
    parameter: Parameter,
    @param.where(Parameter) where?: Where<Parameter>,
  ): Promise<Count> {
    return this.parameterRepository.updateAll(parameter, where);
  }

  @get('/parameters/{id}')
  @response(200, {
    description: 'Parameter model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parameter, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parameter, {exclude: 'where'}) filter?: FilterExcludingWhere<Parameter>
  ): Promise<Parameter> {
    return this.parameterRepository.findById(id, filter);
  }

  @patch('/parameters/{id}')
  @response(204, {
    description: 'Parameter PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parameter, {partial: true}),
        },
      },
    })
    parameter: Parameter,
  ): Promise<void> {
    await this.parameterRepository.updateById(id, parameter);
  }

  @put('/parameters/{id}')
  @response(204, {
    description: 'Parameter PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parameter: Parameter,
  ): Promise<void> {
    await this.parameterRepository.replaceById(id, parameter);
  }

  @del('/parameters/{id}')
  @response(204, {
    description: 'Parameter DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parameterRepository.deleteById(id);
  }
}
