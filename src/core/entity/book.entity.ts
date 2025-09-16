import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BorrowEntity } from "./borrow.entity";
import { BookHistoryEntity } from "./bookHistory.entity";

@Entity('book')
export class BookEntity extends BaseEntity {
	@Column({ type: 'varchar' })
	title: string;

	@Column({ type: 'varchar' })
	author: string;

	@Column({ type: 'int', nullable: true })
	published_year?: number;

	@Column({ type: 'boolean', default: true })
	available: boolean;

	@OneToMany(() => BorrowEntity, (borrow) => borrow.bookId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	bookBorrow: BorrowEntity[];

	@OneToMany(() => BookHistoryEntity, (bookHistory) => bookHistory.bookId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	bookHistory: BookHistoryEntity[];
}