import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
	@ApiProperty({
		type: 'string',
		description: 'full name of user',
		example: 'Adham Rashidov'
	})
	@IsString()
	@IsNotEmpty()
	full_name: string;

	@ApiProperty({
		type: 'string',
		description: 'email address of user',
		example: 'adham@gmail.com'
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		type: 'string',
		description: 'password of user',
		example: 'Adham123!'
	})
	@IsStrongPassword()
	@IsNotEmpty()
	password: string;
}
