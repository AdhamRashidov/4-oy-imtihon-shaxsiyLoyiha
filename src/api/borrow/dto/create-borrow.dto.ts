import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateBorrowDto {
	@ApiProperty({
		description: 'kitob ijaraga berilgan sana',
		example: '10.02.2025'
	})
	@IsDate()
	@IsNotEmpty()
	borrow_date: Date;

	@ApiProperty({
		description: 'kitob qaysi kungacha ijaraga berilishi',
		example: '17.02.2025'
	})
	@IsDate()
	@IsNotEmpty()
	due_date: Date;

	@ApiProperty({
		description: 'kitob qaytariladigan sana',
		example: '17.02.2025'
	})
	@IsDate()
	@IsNotEmpty()
	return_date: Date;

	@ApiProperty({
		type: 'boolean',
		description: "muddati o'tgan yoki o'tmagani",
		example: 'false'
	})
	overdue: boolean;

	@ApiProperty({
		type: 'string',
		description: "kitob ijaraga olgan userning id si",
		example: 'qanaqadir uuid'
	})
	userId: string;

	@ApiProperty({
		type: 'string',
		description: "User ijaraga olgan kitobning id si",
		example: 'qanaqadir uuid'
	})
	bookId: string;
}
