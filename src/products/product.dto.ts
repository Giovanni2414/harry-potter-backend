import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    subtitle?: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    calification: number;

    @IsNotEmpty()
    @IsNumber()
    brand_id: number;

    @IsNotEmpty()
    @IsString()
    image_url: string;
}