import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsNumber()
    stars: number;

    @IsNotEmpty()
    @IsString()
    review_date: string

}