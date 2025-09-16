import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { BorrowEntity } from 'src/core/entity/borrow.entity';
import { BookHistoryEntity } from 'src/core/entity/bookHistory.entity';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, BorrowEntity, BookHistoryEntity])],
	controllers: [UserController],
	providers: [UserService, CryptoService, TokenService],
})
export class UserModule { }
