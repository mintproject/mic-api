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
import {Model} from '../models';
import {ModelRepository} from '../repositories';

export class ModelController {
  constructor(
    @repository(ModelRepository)
    public modelRepository : ModelRepository,
  ) {}

  @post('/models')
  @response(200, {
    description: 'Model model instance',
    content: {'application/json': {schema: getModelSchemaRef(Model)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {
            title: 'NewModel',
            exclude: ['id'],
          }),
        },
      },
    })
    model: Omit<Model, 'id'>,
  ): Promise<Model> {
    return this.modelRepository.create(model);
  }

  @get('/models/count')
  @response(200, {
    description: 'Model model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.modelRepository.count(where);
  }

  @get('/models')
  @response(200, {
    description: 'Array of Model model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Model, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Model) filter?: Filter<Model>,
  ): Promise<Model[]> {
    return this.modelRepository.find(filter);
  }

  @patch('/models')
  @response(200, {
    description: 'Model PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.modelRepository.updateAll(model, where);
  }

  @get('/models/{id}')
  @response(200, {
    description: 'Model model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Model, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Model, {exclude: 'where'}) filter?: FilterExcludingWhere<Model>
  ): Promise<Model> {
    return this.modelRepository.findById(id, filter);
  }

  @patch('/models/{id}')
  @response(204, {
    description: 'Model PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
  ): Promise<void> {
    await this.modelRepository.updateById(id, model);
  }

  @put('/models/{id}')
  @response(204, {
    description: 'Model PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() model: Model,
  ): Promise<void> {
    await this.modelRepository.replaceById(id, model);
  }

  @del('/models/{id}')
  @response(204, {
    description: 'Model DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.modelRepository.deleteById(id);
  }
}
