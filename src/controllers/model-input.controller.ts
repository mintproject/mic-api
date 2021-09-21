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
  Input,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelInputController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/inputs', {
    responses: {
      '200': {
        description: 'Array of Model has many Input',
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
    return this.modelRepository.inputs(id).find(filter);
  }

  @post('/models/{id}/inputs', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Input)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {
            title: 'NewInputInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) input: Omit<Input, 'id'>,
  ): Promise<Input> {
    return this.modelRepository.inputs(id).create(input);
  }

  @patch('/models/{id}/inputs', {
    responses: {
      '200': {
        description: 'Model.Input PATCH success count',
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
    return this.modelRepository.inputs(id).patch(input, where);
  }

  @del('/models/{id}/inputs', {
    responses: {
      '200': {
        description: 'Model.Input DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Input)) where?: Where<Input>,
  ): Promise<Count> {
    return this.modelRepository.inputs(id).delete(where);
  }
}
