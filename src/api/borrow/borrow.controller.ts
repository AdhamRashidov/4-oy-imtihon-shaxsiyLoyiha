import { Controller, Get, Post, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BorrowEntity } from 'src/core/entity/borrow.entity';


@ApiTags('Borrow')
@Controller('borrow')
export class BorrowController {
	constructor(private readonly borrowService: BorrowService) { }

	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER)
	@Post(':bookId')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Borrow a book' })
	@ApiParam({ name: 'bookId', description: 'ID of the book to borrow', type: 'string' })
	@ApiResponse({ status: 201, description: 'Book successfully borrowed', type: BorrowEntity })
	@ApiResponse({ status: 404, description: 'Book not found' })
	create(@Param('bookId') bookId: string, @Req() req: any) {
		return this.borrowService.borrowBook(bookId, req.user.id);
	}

	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER)
	@Patch('return/:id')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Return a borrowed book' })
	@ApiParam({ name: 'id', description: 'ID of the borrow record', type: 'string' })
	@ApiResponse({ status: 200, description: 'Book successfully returned', type: BorrowEntity })
	@ApiResponse({ status: 404, description: 'Borrow record not found' })
	returnBook(@Param('id') id: string) {
		return this.borrowService.returnBook(id);
	}

	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER)
	@Get('my')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all borrows of the logged-in user' })
	@ApiResponse({ status: 200, description: 'List of user borrows', type: [BorrowEntity] })
	Borrows(@Req() req: any) {
		return this.borrowService.myBorrows(req.user.id);
	}
}
