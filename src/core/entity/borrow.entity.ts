import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BookEntity } from "./book.entity";

@Entity('borrow')
export class BorrowEntity extends BaseEntity {
	@Column({ type: 'timestamptz', default: () => 'NOW()' })
	borrow_date: Date;

	@Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP + INTERVAL '7 days'"})
	due_date: Date;

	@Column({ type: 'timestamptz', nullable: true })
	return_date: Date;

	@Column({ type: 'boolean', default: false })
	overdue: boolean;

	@ManyToOne(() => UserEntity, (user) => user.userBorrow)
	userId: UserEntity;

	@ManyToOne(() => BookEntity, (book) => book.bookBorrow)
	bookId: BookEntity;
}