import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "src/config";
import { UserModule } from "./user/user.module";
import { BookModule } from "./book/book.module";
import { BorrowModule } from "./borrow/borrow.module";
import { BookHistoryModule } from "./book-history/book-history.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: config.DB_URL,
			synchronize: true,
			entities: ['dist/core/entity/*.entity{.ts,.js}'],
			autoLoadEntities: true,
		}),
		JwtModule.register({
			global: true,
		}),
		UserModule,
		BookModule,
		BorrowModule,
		BookHistoryModule
	],
})

export class AppModule { }