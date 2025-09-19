import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/core/entity/book.entity';
import { BorrowEntity } from 'src/core/entity/borrow.entity';
import { BookHistoryEntity } from 'src/core/entity/bookHistory.entity';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';

@Module({
	imports: [TypeOrmModule.forFeature([BookEntity, BorrowEntity, BookHistoryEntity])],
	controllers: [BookController],
	providers: [BookService, CryptoService, TokenService],
})
export class BookModule { }
