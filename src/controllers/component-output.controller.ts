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
  Output,
} from '../models';
import {ComponentRepository} from '../repositories';

export class ComponentOutputController {
  constructor(
    @repository(ComponentRepository) protected componentRepository: ComponentRepository,
  ) { }

  @get('/components/{id}/outputs', {
    responses: {
      '200': {
        description: 'Array of Component has many Output',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Output)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Output>,
  ): Promise<Output[]> {
    return this.componentRepository.outputs(id).find(filter);
  }

  @post('/components/{id}/outputs', {
    responses: {
      '200': {
        description: 'Component model instance',
        content: {'application/json': {schema: getModelSchemaRef(Output)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Component.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {
            title: 'NewOutputInComponent',
            exclude: ['id'],
            optional: ['componentId']
          }),
        },
      },
    }) output: Omit<Output, 'id'>,
  ): Promise<Output> {
    return this.componentRepository.outputs(id).create(output);
  }

  @patch('/components/{id}/outputs', {
    responses: {
      '200': {
        description: 'Component.Output PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {partial: true}),
        },
      },
    })
    output: Partial<Output>,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.componentRepository.outputs(id).patch(output, where);
  }

  @del('/components/{id}/outputs', {
    responses: {
      '200': {
        description: 'Component.Output DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.componentRepository.outputs(id).delete(where);
  }
}
