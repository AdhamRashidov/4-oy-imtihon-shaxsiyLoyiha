import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { BookEntity } from 'src/core/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { BookRepository } from 'src/core/repository/book.repository';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { successRes } from 'src/infrastructure/response/success';
import { Roles } from 'src/common/enum';
import { IToken } from 'src/infrastructure/token/interface';

@Injectable()
export class BookService extends BaseService<CreateBookDto, UpdateBookDto, BookEntity> {
	constructor(
		@InjectRepository(BookEntity) private readonly bookRepo: BookRepository,
		private readonly crypto: CryptoService,
		private readonly tokenService: TokenService,
	) {
		super(bookRepo)
	}

	async createBook(createBookDto: CreateBookDto, role: Roles) {
		const { title } = createBookDto;
		const existsTitle = await this.bookRepo.findOne({
			where: { title },
		});
		if (existsTitle) {
			throw new ConflictException('This book already exists');
		}
		const newBook = this.bookRepo.create({
			...createBookDto,
			title
		});
		await this.bookRepo.save(newBook);
		return successRes(newBook, 201);
	}

	async statisticsBook() {
		const stats = await this.bookRepo
			.createQueryBuilder("book")
			.leftJoin("book.bookHistory", "history")
			.select("book.id", "bookId")
			.addSelect("book.title", "title")
			.addSelect("COUNT(history.id)", "buyurtma_soni")
			.groupBy("book.id")
			.addGroupBy("book.title")
			.orderBy("COUNT(history.id)", "DESC")
			.limit(5)
			.getRawMany();

		return successRes(stats);
	}

	async statisticsUser() {
		const data = await this.bookRepo
			.createQueryBuilder("book")
			.leftJoin("book.bookHistory", "history")
			.leftJoin("history.userId", "user")
			.select("user.id", "userId")
			.addSelect("user.full_name", "full_name")
			.addSelect("COUNT(history.id)", "buyurtma_soni")
			.groupBy("user.id")
			.addGroupBy("user.full_name")
			.orderBy("COUNT(history.id)", "DESC")
			.limit(5)
			.getRawMany();

		return successRes(data);
	}

	async query(options: any) {
		return this.bookRepo.find(options);
	}

	async bookHistory(id: string) {
		const data = await this.bookRepo.findOne({ where: { id }, relations: { bookHistory: true } })
		if (!data) {
			throw new NotFoundException('Data not fount')
		}
		return successRes(data);
	}

	async updateBook(id: string, updateBookDto: UpdateBookDto) {
		const { title } = updateBookDto;
		const book = await this.bookRepo.findOne({ where: { id } });
		if (!book) {
			throw new NotFoundException('book not found');
		}
		if (title) {
			const existsTitle = await this.bookRepo.findOne({
				where: { title },
			});
			if (existsTitle && existsTitle.id !== id) {
				throw new ConflictException('This book is already exists')
			}
		}
		await this.bookRepo.update(
			{ id },
			{
				...updateBookDto
			}
		)

		return this.findOneById(id);
	}

	async removeBook(id: string) {
		const book = await this.bookRepo.findOne({ where: { id } });
		if (!book) {
			throw new NotFoundException('Book not found');
		}
		return this.delete(id);
	}
}
