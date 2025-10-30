import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // --------- Público (leitura) ---------
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiOkResponse({
    description: 'Lista completa de produtos',
    schema: {
      example: [
        {
          id: '6716a2e3bcd1234abcd56789',
          name: 'Majestic Vintage Mocha Overcoat',
          price: 129.99,
          description: 'Casaco comprido com estilo vintage em tom mocha.',
        },
        {
          id: '6716a2e3bcd1234abcd56790',
          name: 'Enchanting Blush Dream Gown',
          price: 189.99,
          description:
            'Vestido elegante em tom blush, perfeito para ocasiões especiais.',
        },
      ],
    },
  })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto (ObjectId)' })
  @ApiOkResponse({
    description: 'Produto encontrado',
    schema: {
      example: {
        id: '6716a2e3bcd1234abcd56789',
        name: 'Majestic Vintage Mocha Overcoat',
        price: 129.99,
        description: 'Casaco comprido vintage em tom mocha.',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Product not found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid ObjectId',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // --------- Admin (escrita) ---------

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Criar produto (admin)' })
  @ApiCookieAuth('accessToken')
  @ApiCreatedResponse({
    description: 'Produto criado',
    schema: {
      example: {
        id: '6716a2e3bcd1234abcd56789',
        name: 'Majestic Vintage Mocha Overcoat',
        price: 129.99,
        description: 'Casaco comprido vintage em tom mocha.',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'name should not be empty',
          'price must be a non-negative number',
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Não autenticado',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Sem permissões (não é admin)',
    schema: {
      example: {
        statusCode: 403,
        error: 'Forbidden',
        message: 'Forbidden resource',
      },
    },
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar produto (admin)' })
  @ApiCookieAuth('accessToken')
  @ApiParam({ name: 'id', description: 'ID do produto (ObjectId)' })
  @ApiOkResponse({
    description: 'Produto atualizado',
    schema: {
      example: {
        id: '6716a2e3bcd1234abcd56789',
        name: 'Majestic Vintage Mocha Overcoat (Updated)',
        price: 139.99,
        description: 'Descrição atualizada.',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Product not found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID ou payload inválido',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: ['price must be a non-negative number'],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Não autenticado',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Sem permissões (não é admin)',
    schema: {
      example: {
        statusCode: 403,
        error: 'Forbidden',
        message: 'Forbidden resource',
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar produto (admin)' })
  @ApiCookieAuth('accessToken')
  @ApiParam({ name: 'id', description: 'ID do produto (ObjectId)' })
  @ApiNoContentResponse({ description: 'Removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Product not found',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Não autenticado',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Sem permissões (não é admin)',
    schema: {
      example: {
        statusCode: 403,
        error: 'Forbidden',
        message: 'Forbidden resource',
      },
    },
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.delete(id);
  }
}
