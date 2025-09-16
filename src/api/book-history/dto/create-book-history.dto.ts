import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";
import { Action } from "src/common/enum";

export class CreateBookHistoryDto {
	@ApiProperty({
		enum: Action,
		description: 'kitobning ijaraga berilgan yoki qaytarilganligini holati',
		example: 'BORROW'
	})
	@IsEnum(Action)
	action: Action;

	@ApiProperty({
		description: 'hozirgi vaqt',
		example: '29.11.2025'
	})
	@IsDate()
	@IsNotEmpty()
	date: Date;

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
