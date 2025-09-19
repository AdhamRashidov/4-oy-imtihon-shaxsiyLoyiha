import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseUUIDPipe, Query, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';
import { QueryBookDto } from './dto/query-book.dto';
import { ILike } from 'typeorm';
import { userData } from 'src/common/document/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) { }

	@ApiOperation({
		summary: 'create book'
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Post()
	@ApiBearerAuth()
	create(@Body() createBookDto: CreateBookDto, @Req() req) {
		const role = req.user.role;
		return this.bookService.createBook(createBookDto, role);
	}




	@ApiOperation({
		summary: 'Book history stats'
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Get('book-history/:id')
	@ApiBearerAuth()
	bookStats(@Param('id', ParseUUIDPipe) id: string) {
		return this.bookService.bookHistory(id);
	}



	@ApiOperation({
		summary: 'User statistics'
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Get('stats-user')
	@ApiBearerAuth()
	userStats() {
		return this.bookService.statisticsUser()
	}


	@ApiOperation({
		summary: 'Book statistics'
	})
	@Get('stats-book')
	statsBook() {
		return this.bookService.statisticsBook()
	}


	@ApiOperation({
		summary: 'Query'
	})
	@Post('query')
	querry(@Query() queryDto: QueryBookDto) {
		const { title, author, published_year, available } = queryDto;

		const where: any = {}

		if (title) where.title = ILike(`%${title}%`);
		if (author) where.author = ILike(`%${author}%`);
		if (published_year) where.published_year = published_year;
		if (available) where.available = available;

		return this.bookService.query({
			where,
			relations: { bookHistory: true, bookBorrow: true }
		})
	}




	@ApiOperation({
		summary: 'get all books'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'All books get successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: ['hamma booklar']
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get books',
		schema: {
			example: {
				statusCode: 500,
				error: {
					message: 'Internal server error',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Get('all-books')
	@ApiBearerAuth()
	findAll() {
		return this.bookService.findAll({
			relations: { bookBorrow: true, bookHistory: true },
			order: { createdAt: 'DESC' }
		});
	}





	@ApiOperation({
		summary: 'get book by id'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'get book by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: 'id dagi book'
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get book by id',
		schema: {
			example: {
				statusCode: 500,
				error: {
					message: 'Internal server error',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Get('book/:id')
	@ApiBearerAuth()
	findOneBook(@Param('id', ParseUUIDPipe) id: string) {
		return this.bookService.findOneById(id, {
			relations: { bookBorrow: true, bookHistory: true },
		});
	}




	@ApiOperation({
		summary: 'update book'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'book ni Id sini kiriting'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: {
					type: 'string',
				},
				author: {
					type: 'string',
				},
				published_year: {
					type: 'number',
				},
				available: {
					type: 'boolean',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Patch('book/:id')
	@ApiBearerAuth()
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
		return this.bookService.updateBook(id, updateBookDto);
	}






	@ApiOperation({
		summary: 'delete book'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'book ni Id sini kiriting'
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
	@Delete(':id')
	@ApiBearerAuth()
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.bookService.removeBook(id);
	}
}
