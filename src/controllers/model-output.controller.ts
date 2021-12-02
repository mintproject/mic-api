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
  Output,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelOutputController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/outputs', {
    responses: {
      '200': {
        description: 'Array of Model has many Output',
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
    return this.modelRepository.outputs(id).find(filter);
  }

  @post('/models/{id}/outputs', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Output)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {
            title: 'NewOutputInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) output: Omit<Output, 'id'>,
  ): Promise<Output> {
    return this.modelRepository.outputs(id).create(output);
  }

  @patch('/models/{id}/outputs', {
    responses: {
      '200': {
        description: 'Model.Output PATCH success count',
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
    return this.modelRepository.outputs(id).patch(output, where);
  }

  @del('/models/{id}/outputs', {
    responses: {
      '200': {
        description: 'Model.Output DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.modelRepository.outputs(id).delete(where);
  }
}
