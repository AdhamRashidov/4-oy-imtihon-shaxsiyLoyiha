import { BaseEntity } from "src/common/database/base.entity";
import { Roles } from "src/common/enum";
import { Column, Entity, OneToMany } from "typeorm";
import { BorrowEntity } from "./borrow.entity";
import { BookHistoryEntity } from "./bookHistory.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
	@Column({ type: 'varchar', nullable:true })
	full_name: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'enum', enum: Roles })
	role: Roles;

	@OneToMany(() => BorrowEntity, (borrow) => borrow.userId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	userBorrow: BorrowEntity[];

	@OneToMany(() => BookHistoryEntity, (bookHistory) => bookHistory.userId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	userBookHistory: BookHistoryEntity[];
}