import { Injectable } from '@nestjs/common';
import { CreateBookHistoryDto } from './dto/create-book-history.dto';
import { UpdateBookHistoryDto } from './dto/update-book-history.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { BookHistoryEntity } from 'src/core/entity/bookHistory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

@Injectable()
export class BookHistoryService extends BaseService
<
	CreateBookHistoryDto,
	UpdateBookHistoryDto, BookHistoryEntity
> {
	constructor(
		@InjectRepository(BookHistoryEntity)
		private readonly historyRepo: Repository<BookHistoryEntity>
	) {
		super(historyRepo)
	}
}
