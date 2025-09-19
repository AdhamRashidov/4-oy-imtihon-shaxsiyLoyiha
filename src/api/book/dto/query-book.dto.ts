import {  ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryBookDto{
    @ApiPropertyOptional()
        @IsString()
        @IsOptional()
        title: string;
    
        @ApiPropertyOptional()
        @IsString()
        @IsOptional()
        author: string;
    
        @ApiPropertyOptional()
        @IsNumber()
        @IsOptional()
        @Type(() => Number)
        published_year: number;
    
        @ApiPropertyOptional()
        @IsBoolean()
        @IsOptional()
        @Type(() => Boolean)
        available: boolean;
}