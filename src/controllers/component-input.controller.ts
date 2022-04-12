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
  Input,
} from '../models';
import {ComponentRepository} from '../repositories';

export class ComponentInputController {
  constructor(
    @repository(ComponentRepository) protected componentRepository: ComponentRepository,
  ) { }

  @get('/components/{id}/inputs', {
    responses: {
      '200': {
        description: 'Array of Component has many Input',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Input)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Input>,
  ): Promise<Input[]> {
    return this.componentRepository.inputs(id).find(filter);
  }

  @post('/components/{id}/inputs', {
    responses: {
      '200': {
        description: 'Component model instance',
        content: {'application/json': {schema: getModelSchemaRef(Input)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Component.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {
            title: 'NewInputInComponent',
            exclude: ['id'],
            optional: ['componentId']
          }),
        },
      },
    }) input: Omit<Input, 'id'>,
  ): Promise<Input> {
    return this.componentRepository.inputs(id).create(input);
  }

  @patch('/components/{id}/inputs', {
    responses: {
      '200': {
        description: 'Component.Input PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {partial: true}),
        },
      },
    })
    input: Partial<Input>,
    @param.query.object('where', getWhereSchemaFor(Input)) where?: Where<Input>,
  ): Promise<Count> {
    return this.componentRepository.inputs(id).patch(input, where);
  }

  @del('/components/{id}/inputs', {
    responses: {
      '200': {
        description: 'Component.Input DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Input)) where?: Where<Input>,
  ): Promise<Count> {
    return this.componentRepository.inputs(id).delete(where);
  }
}
