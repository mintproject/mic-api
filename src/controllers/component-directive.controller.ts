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
  Directive,
} from '../models';
import {ComponentRepository} from '../repositories';

export class ComponentDirectiveController {
  constructor(
    @repository(ComponentRepository) protected componentRepository: ComponentRepository,
  ) { }

  @get('/components/{id}/directives', {
    responses: {
      '200': {
        description: 'Array of Component has many Directive',
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
    return this.componentRepository.directives(id).find(filter);
  }

  @post('/components/{id}/directives', {
    responses: {
      '200': {
        description: 'Component model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directive)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Component.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {
            title: 'NewDirectiveInComponent',
            exclude: ['id'],
            optional: ['componentId']
          }),
        },
      },
    }) directive: Omit<Directive, 'id'>,
  ): Promise<Directive> {
    return this.componentRepository.directives(id).create(directive);
  }

  @patch('/components/{id}/directives', {
    responses: {
      '200': {
        description: 'Component.Directive PATCH success count',
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
    return this.componentRepository.directives(id).patch(directive, where);
  }

  @del('/components/{id}/directives', {
    responses: {
      '200': {
        description: 'Component.Directive DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directive)) where?: Where<Directive>,
  ): Promise<Count> {
    return this.componentRepository.directives(id).delete(where);
  }
}
