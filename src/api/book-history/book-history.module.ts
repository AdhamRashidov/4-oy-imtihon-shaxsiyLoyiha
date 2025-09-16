import { Module } from '@nestjs/common';
import { BookHistoryService } from './book-history.service';
import { BookHistoryController } from './book-history.controller';

@Module({
  controllers: [BookHistoryController],
  providers: [BookHistoryService],
})
export class BookHistoryModule {}
