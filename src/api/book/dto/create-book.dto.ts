import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
	@ApiProperty({
		type: 'string',
		description: 'title of book',
		example: "O'tgan kunlar"
	})
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		type: 'string',
		description: 'kitobning muallifi',
		example: "Abdulla Qodiriy"
	})
	@IsString()
	@IsNotEmpty()
	author: string;

	@ApiProperty({
		type: 'number',
		description: 'yozilgan yili',
		example: 1441
	})
	@IsInt()
	@IsOptional()
	published_year: number;

	@ApiProperty({
		type: 'boolean',
		description: 'kitob mavjudligi yani bor yoki yoqligi',
		example: false
	})
	@IsBoolean()
	available: boolean;
}
