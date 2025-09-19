import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { BookHistoryService } from './book-history.service';
import { CreateBookHistoryDto } from './dto/create-book-history.dto';
import { UpdateBookHistoryDto } from './dto/update-book-history.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';

@Controller('book-history')
export class BookHistoryController {
	constructor(private readonly bookHistoryService: BookHistoryService) { }

	@ApiOperation({
		summary: 'see full history'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'get all history succesfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'suucess',
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get admin by id',
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
	@Get()
	@ApiBearerAuth()
	findAll() {
		return this.bookHistoryService.findAll({
			relations: { bookId: true, userId: true }
		});
	}
}
