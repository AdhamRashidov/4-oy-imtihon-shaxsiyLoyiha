import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowEntity } from 'src/core/entity/borrow.entity';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import { BookEntity } from 'src/core/entity/book.entity';
import type { BookRepository } from 'src/core/repository/book.repository';
import { BookHistoryEntity } from 'src/core/entity/bookHistory.entity';
import type { BookHistoryRepository } from 'src/core/repository/bookHistory.repository';
import { UserEntity } from 'src/core/entity/user.entity';
import type { UserRepository } from 'src/core/repository/user.repository';
import { DataSource } from 'typeorm';
import { Action } from 'src/common/enum';
import { BaseService } from 'src/infrastructure/base/base.service';

@Injectable()
export class BorrowService {
	constructor(
		@InjectRepository(BorrowEntity) private readonly borrowRepo: BorrowRepository,
		@InjectRepository(BookEntity) private readonly bookRepo: BookRepository,
		@InjectRepository(BookHistoryEntity) private readonly bookHistoryRepo: BookHistoryRepository,
		@InjectRepository(UserEntity) private readonly userRepo: UserRepository,
		private dataSource: DataSource
	) { }

	async borrowBook(bookId: string, userId: string) {
		return this.dataSource.transaction(async (manager) => {
			const user = await manager.findOne(UserEntity, {
				where: { id: userId },
				relations: ['userBorrow'],
			});
			if (!user) {
				throw new NotFoundException('User not found');
			}

			const book = await manager.findOne(BookEntity, { where: { id: bookId } });
			if (!book || !book.available) {
				throw new BadRequestException('kitob topilmadi yoki yoq')
			}
			if (user.userBorrow.length >= 3) {
				throw new BadRequestException('max books size limit 3')
			}
			const due_date = new Date();
			due_date.setDate(due_date.getDate() + 7);

			const borrow = manager.create(BorrowEntity, {
				userId: user,
				bookId: book,
				borrow_date: new Date(),
				due_date,
				overdue: false,
			});
			await manager.save(borrow);

			book.available = false;
			await manager.save(book);

			const history = manager.create(BookHistoryEntity, {
				bookId: book,
				userId: user,
				action: Action.BORROW,
				date: new Date(),
			});
			await manager.save(history);
			return borrow;
		});
	}

	async returnBook(borrowId: string) {
		return this.dataSource.transaction(async (manager) => {
			const borrow = await manager.findOne(BorrowEntity, {
				where: { id: borrowId },
				relations: ['bookId', 'userId']
			});
			if (!borrow) {
				throw new NotFoundException('Borrow not found');
			}
			borrow.return_date = new Date();
			if (borrow.return_date > borrow.due_date) {
				borrow.overdue = true;
			}
			await manager.save(borrow.bookId);

			const history = manager.create(BookHistoryEntity, {
				bookId: borrow.bookId,
				userId: borrow.userId,
				action: Action.RETURN,
				date: new Date(),
			});
			await manager.save(history);
			return borrow;
		});
	}

	async myBorrows(userId: string) {
		return this.borrowRepo.find({
			where: { userId: { id: userId } },
			relations: ['bookId']
		});
	}
}
