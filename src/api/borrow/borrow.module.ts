import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from 'src/core/entity/borrow.entity';
import { BookEntity } from 'src/core/entity/book.entity';
import { BookHistoryEntity } from 'src/core/entity/bookHistory.entity';
import { UserEntity } from 'src/core/entity/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([BorrowEntity, BookEntity, BookHistoryEntity, UserEntity])],
	controllers: [BorrowController],
	providers: [BorrowService],
	exports: [BorrowService]
})
export class BorrowModule { }
