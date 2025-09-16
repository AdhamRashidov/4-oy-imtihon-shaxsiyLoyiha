import { BaseEntity } from "src/common/database/base.entity";
import { Action } from "src/common/enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BookEntity } from "./book.entity";

@Entity('book-entity')
export class BookHistoryEntity extends BaseEntity {
	@Column({ type: 'enum', enum: Action, default: Action.BORROW })
	action: Action;

	@Column({ type: 'timestamptz', default: () => 'NOW()' })
	date: Date;

	@ManyToOne(() => UserEntity, (user) => user.userBookHistory)
	userId: UserEntity;

	@ManyToOne(() => BookEntity, (book) => book.bookHistory)
	bookId: BookEntity;
}