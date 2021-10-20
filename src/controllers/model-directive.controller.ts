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
  Directive,
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelDirectiveController {
  constructor(
    @repository(ModelRepository) protected modelRepository: ModelRepository,
  ) { }

  @get('/models/{id}/directives', {
    responses: {
      '200': {
        description: 'Array of Model has many Directive',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Directive)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Directive>,
  ): Promise<Directive[]> {
    return this.modelRepository.directives(id).find(filter);
  }

  @post('/models/{id}/directives', {
    responses: {
      '200': {
        description: 'Model model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directive)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {
            title: 'NewDirectiveInModel',
            exclude: ['id'],
            optional: ['modelId']
          }),
        },
      },
    }) directive: Omit<Directive, 'id'>,
  ): Promise<Directive> {
    return this.modelRepository.directives(id).create(directive);
  }

  @patch('/models/{id}/directives', {
    responses: {
      '200': {
        description: 'Model.Directive PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {partial: true}),
        },
      },
    })
    directive: Partial<Directive>,
    @param.query.object('where', getWhereSchemaFor(Directive)) where?: Where<Directive>,
  ): Promise<Count> {
    return this.modelRepository.directives(id).patch(directive, where);
  }

  @del('/models/{id}/directives', {
    responses: {
      '200': {
        description: 'Model.Directive DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directive)) where?: Where<Directive>,
  ): Promise<Count> {
    return this.modelRepository.directives(id).delete(where);
  }
}
