import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, UseInterceptors, Res, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userData } from 'src/common/document/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';
import type { Response } from 'express';
import { GetRequestUser } from 'src/common/decorator/get-request-user.decorator';
import type { IToken } from 'src/infrastructure/token/interface';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

	@ApiOperation({
		summary: 'SuperAdmin Auth'
	})
	@Post('superadmin-signIn')
	signinSuperAdmin(
		@Body() signInDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.signIn(signInDto, res);
	}

	@ApiOperation({
		summary: 'create admin'
	})
	@ApiConsumes('application/json')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'admin created',
		schema: {
			example: {
				statusCode: 201,
				message: 'success',
				data: userData
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: 'failed cerating admin',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Email already exists',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.SUPERADMIN)
	@Post('admin')
	@ApiBearerAuth()
	createAdmin(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto, Roles.ADMIN);
	}



	@ApiOperation({
		summary: 'create librarian'
	})
	@ApiConsumes('application/json')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'librarian created',
		schema: {
			example: {
				statusCode: 201,
				message: 'success',
				data: userData
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: 'failed cerating librarian',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Email already exists',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@Post('librarian')
	@ApiBearerAuth()
	createLibrarian(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto, Roles.LIBRARIAN);
	}



	@ApiOperation({
		summary: 'create reader'
	})
	@ApiConsumes('application/json')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'reader created',
		schema: {
			example: {
				statusCode: 201,
				message: 'success',
				data: userData
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: 'failed cerating reader',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Email already exists',
				},
			},
		},
	})
	@UseGuards(AuthGuard, RolesGuard)
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@Post('reader')
	@ApiBearerAuth()
	createReader(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto, Roles.READER);
	}


	@ApiOperation({
		summary: 'Sign in admin',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Admin sign in',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					token: 'lkasdfjaskldjfasdifjm2ohnkb42309judsfkanfoasdjf',
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'Unauthorized',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Refresh token expired',
				},
			},
		},
	})
	@Post('signin-admin')
	signinAdmin(
		@Body() signInDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.signIn(signInDto, res);
	}


	@ApiOperation({
		summary: 'Sign in librarian',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'librarian sign in',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					token: 'lkasdfjaskldjfasdifjm2ohnkb42309judsfkanfoasdjf',
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'Unauthorized',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Refresh token expired',
				},
			},
		},
	})
	@Post('signin-librarian')
	signinLibrarian(
		@Body() signInDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.signIn(signInDto, res);
	}


	@ApiOperation({
		summary: 'Sign in reader',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'reader sign in',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					token: 'lkasdfjaskldjfasdifjm2ohnkb42309judsfkanfoasdjf',
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'Unauthorized',
		schema: {
			example: {
				statusCode: 400,
				error: {
					message: 'Refresh token expired',
				},
			},
		},
	})
	@Post('signin-reader')
	signinReader(
		@Body() signInDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.userService.signIn(signInDto, res);
	}



	@ApiOperation({
		summary: 'Get all admins'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'All admins get successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: [{
					...userData,
				}],
			},
		}
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get admins',
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
	@AccessRoles(Roles.SUPERADMIN)
	@Get('all-admins')
	@ApiBearerAuth()
	findAllAdmins() {
		return this.userService.findAll({
			where: { role: Roles.ADMIN },
			order: { createdAt: 'DESC' },
			select: {
				id: true,
				full_name: true,
				email: true,
				hashedPassword: true,
				role: true
			},
			relations: ['userBorrow', 'userBookHistory'],
		});
	}





	@ApiOperation({
		summary: 'Get all librarian'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'All librarians get successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: [{
					...userData,
				}],
			},
		}
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get librarians',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
	@Get('all-librarians')
	@ApiBearerAuth()
	findAllLibrarians() {
		return this.userService.findAll({
			where: { role: Roles.LIBRARIAN },
			order: { createdAt: 'DESC' },
			select: {
				id: true,
				full_name: true,
				email: true,
				hashedPassword: true,
				role: true
			},
			relations: ['userBorrow', 'userBookHistory'],
		});
	}





	@ApiOperation({
		summary: 'Get all readers'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'All readers get successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: [{
					...userData,
				}],
			},
		}
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get readers',
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
	@Get('all-readers')
	@ApiBearerAuth()
	findAllReaders() {
		return this.userService.findAll({
			where: { role: Roles.READER },
			order: { createdAt: 'DESC' },
			select: {
				id: true,
				full_name: true,
				email: true,
				hashedPassword: true,
				role: true
			},
			relations: ['userBorrow', 'userBookHistory'],
		});
	}




	@ApiOperation({
		summary: 'Get admin by id',
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'gugcqu89803-q-veqnvn3oqoi2oc21no-22s',
		description: 'Adminni Id si shu yerga kiritiladi.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Admin get by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'suucess',
				data: {
					...userData,
				},
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
	@AccessRoles(Roles.SUPERADMIN, 'ID')
	@Get('admin/:id')
	@ApiBearerAuth()
	findOneAdmin(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.findOneById(id, {
			where: { role: Roles.ADMIN },
			relations: ['userBorrow', 'userBookHistory'],
		});
	}




	@ApiOperation({
		summary: 'Get librarian by id',
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'gugcqu89803-q-veqnvn3oqoi2oc21no-22s',
		description: 'kutubxonachini Id si shu yerga kiritiladi.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Librarian get by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'suucess',
				data: {
					...userData,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get librarian by id',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, 'ID')
	@Get('librarian/:id')
	@ApiBearerAuth()
	findOneLibrarian(@Param('id') id: string) {
		return this.userService.findOneById(id, {
			where: { role: Roles.LIBRARIAN },
			relations: ['userBorrow', 'userBookHistory'],
		});
	}







	@ApiOperation({
		summary: 'Get reader by id',
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'gugcqu89803-q-veqnvn3oqoi2oc21no-22s',
		description: 'Kitobxonni Id si shu yerga kiritiladi.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Reader get by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'suucess',
				data: {
					...userData,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on get reader by id',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, 'ID')
	@Get('reader/:id')
	@ApiBearerAuth()
	findOneReader(@Param('id') id: string) {
		return this.userService.findOneById(id, {
			where: { role: Roles.READER },
			relations: ['userBorrow', 'userBookHistory'],
		});
	}





	@ApiOperation({
		summary: 'update admin by id'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'Adminni Id si shu yerga yoziladi'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				full_name: {
					type: 'string',
					format: 'string'
				},
				email: {
					type: 'string',
					format: 'email'
				},
				password: {
					type: 'string',
					format: 'string'
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Admin updated by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					...userData,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on updating admin by id',
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
	@AccessRoles(Roles.SUPERADMIN, 'ID')
	@Patch('admin/:id')
	@ApiBearerAuth()
	updateAdmin(
		@GetRequestUser('user') user: IToken,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.userService.updateUser(id, updateUserDto, user);
	}




	@ApiOperation({
		summary: 'update librarian by id'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'Librarianni Id si shu yerga yoziladi'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				full_name: {
					type: 'string',
					format: 'string'
				},
				email: {
					type: 'string',
					format: 'email'
				},
				password: {
					type: 'string',
					format: 'string'
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Librarian updated by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					...userData,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on updating librarian by id',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, 'ID')
	@Patch('librarian/:id')
	@ApiBearerAuth()
	updateLibrarian(
		@GetRequestUser('user') user: IToken,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.userService.updateUser(id, updateUserDto, user);
	}






	@ApiOperation({
		summary: 'update reader by id'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'Readerni Id si shu yerga yoziladi'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				full_name: {
					type: 'string',
					format: 'string'
				},
				email: {
					type: 'string',
					format: 'email'
				},
				password: {
					type: 'string',
					format: 'string'
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Reader updated by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {
					...userData,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on updating reader by id',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, 'ID')
	@Patch('reader/:id')
	@ApiBearerAuth()
	updateReader(
		@GetRequestUser('user') user: IToken,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.userService.updateUser(id, updateUserDto, user);
	}





	@ApiOperation({
		summary: 'Delete admin'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'Adminni Id si shu yerga yoziladi'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Admin deleted by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on deleting admin by id',
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
	@AccessRoles(Roles.SUPERADMIN)
	@Delete('admin/:id')
	@ApiBearerAuth()
	removeAdmin(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.deleteUser(id);
	}





	@ApiOperation({
		summary: 'Delete librarian'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'librarianni Id si shu yerga yoziladi'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Admin deleted by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on deleting librarian by id',
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
	@AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
	@Delete('librarian/:id')
	@ApiBearerAuth()
	removeLibrarian(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.deleteUser(id);
	}






	@ApiOperation({
		summary: 'Delete reader'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		example: 'e6b189ff-1d45-44e9-a252-5a0b48f3678f',
		description: 'readerni Id si shu yerga yoziladi'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Reader deleted by id successfully',
		schema: {
			example: {
				statusCode: 200,
				message: 'success',
				data: {},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Error on deleting reader by id',
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
	@Delete('reader/:id')
	@ApiBearerAuth()
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.deleteUser(id);
	}
}
