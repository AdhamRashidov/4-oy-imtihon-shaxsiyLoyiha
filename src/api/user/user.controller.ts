import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, UseInterceptors, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userData } from 'src/common/document/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';
import type { Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

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
	@AccessRoles(Roles.ADMIN)
	@Post('admin')
	@ApiBearerAuth()
	createAdmin(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
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
	@AccessRoles(Roles.LIBRARIAN)
	@Post('librarian')
	@ApiBearerAuth()
	createLibrarian(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
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
	@AccessRoles(Roles.READER)
	@Post('reader')
	@ApiBearerAuth()
	createReader(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
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




	// @Get()
	// findAll() {
	// 	return this.userService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.userService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.userService.remove(+id);
	// }
}
