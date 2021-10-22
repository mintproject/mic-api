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
import {Directive} from '../models';
import {DirectiveRepository} from '../repositories';

export class DirectiveController {
  constructor(
    @repository(DirectiveRepository)
    public directiveRepository : DirectiveRepository,
  ) {}

  @post('/directives')
  @response(200, {
    description: 'Directive model instance',
    content: {'application/json': {schema: getModelSchemaRef(Directive)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {
            title: 'NewDirective',
            exclude: ['id'],
          }),
        },
      },
    })
    directive: Omit<Directive, 'id'>,
  ): Promise<Directive> {
    return this.directiveRepository.create(directive);
  }

  @get('/directives/count')
  @response(200, {
    description: 'Directive model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Directive) where?: Where<Directive>,
  ): Promise<Count> {
    return this.directiveRepository.count(where);
  }

  @get('/directives')
  @response(200, {
    description: 'Array of Directive model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Directive, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Directive) filter?: Filter<Directive>,
  ): Promise<Directive[]> {
    return this.directiveRepository.find(filter);
  }

  @patch('/directives')
  @response(200, {
    description: 'Directive PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {partial: true}),
        },
      },
    })
    directive: Directive,
    @param.where(Directive) where?: Where<Directive>,
  ): Promise<Count> {
    return this.directiveRepository.updateAll(directive, where);
  }

  @get('/directives/{id}')
  @response(200, {
    description: 'Directive model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Directive, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Directive, {exclude: 'where'}) filter?: FilterExcludingWhere<Directive>
  ): Promise<Directive> {
    return this.directiveRepository.findById(id, filter);
  }

  @patch('/directives/{id}')
  @response(204, {
    description: 'Directive PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directive, {partial: true}),
        },
      },
    })
    directive: Directive,
  ): Promise<void> {
    await this.directiveRepository.updateById(id, directive);
  }

  @put('/directives/{id}')
  @response(204, {
    description: 'Directive PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() directive: Directive,
  ): Promise<void> {
    await this.directiveRepository.replaceById(id, directive);
  }

  @del('/directives/{id}')
  @response(204, {
    description: 'Directive DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.directiveRepository.deleteById(id);
  }
}
