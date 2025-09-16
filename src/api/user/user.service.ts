import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import type { UserRepository } from 'src/core/repository/user.repository';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { BaseService } from 'src/infrastructure/base/base.service';
import { successRes } from 'src/infrastructure/response/success';
import { IToken } from 'src/infrastructure/token/interface';
import { Response } from 'express';
import { Roles } from 'src/common/enum';
import { config } from 'src/config';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto, UserEntity> {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepo: UserRepository,
		private readonly crypto: CryptoService,
		private readonly tokenService: TokenService
	) {
		super(userRepo);
	}

	async onModuleInit(): Promise<void> {
		try {
			const existsAdmin = await this.userRepo.findOne({
				where: { role: Roles.ADMIN },
			});
			const hashedPassword = await this.crypto.encrypt(config.ADMIN.ADMIN_PASSWORD);
			if (!existsAdmin) {
				const admin = this.userRepo.create({
					email: config.ADMIN.ADMIN_EMAIL,
					hashedPassword: hashedPassword,
					role: Roles.ADMIN,
				});
				console.log({admin});
				await this.userRepo.save(admin);
				console.log('Super admin created successfully');
			}
		} catch (error) {
			throw new InternalServerErrorException('Error on creaeting super admin');
		}
	  }

	async createUser(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto;
		const existsEmail = await this.userRepo.findOne({
			where: { email },
		});
		if (existsEmail) {
			throw new ConflictException('Email address already exists');
		}
		const hashedPassword = await this.crypto.encrypt(password);
		const newUser = this.userRepo.create({
			email,
			hashedPassword,
		});
		await this.userRepo.save(newUser);
		return successRes(newUser, 201);
	}

	async signIn(signInDto: CreateUserDto, res: Response) {
		const { email, password } = signInDto;
		const user = await this.userRepo.findOne({
			where: { email },
		});
		const isMatchPassword = await this.crypto.decrypt(
			password,
			user?.hashedPassword || '',
		);
		if (!user || !isMatchPassword) {
			throw new BadRequestException('Email or password incorrect');
		}
		const payload: IToken = {
			id: user.id,
			role: user.role,
		};
		const accessToken = await this.tokenService.accessToken(payload);
		const refreshToken = await this.tokenService.refreshToken(payload);
		await this.tokenService.writeCookie(res, 'userToken', refreshToken, 30);
		return successRes({ token: { accessToken } });
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto, user: IToken) {
		const { email, password } = updateUserDto;
		const users = await this.userRepo.findOne({ where: { id } });
		if (!users) {
			throw new NotFoundException('User not found');
		}
		if (email) {
			const existsEmail = await this.userRepo.findOne({
				where: { email },
			});
			if (existsEmail && existsEmail.id !== id) {
				throw new ConflictException('Email address already exists');
			}
		}
		let hashedPassword = users?.hashedPassword;
		if (user.role === Roles.ADMIN) {
			if (password) {
				hashedPassword = await this.crypto.encrypt(password);
			}
		}
		await this.userRepo.update(
			{ id },
			{
				email,
				hashedPassword,
			}
		);
		return this.findOneById(id);
	}

	async deleteUser(id: string) {
		const user = await this.userRepo.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return this.delete(id);
	}
}
