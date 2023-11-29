import {IsNotEmpty, IsPositive, IsString} from 'class-validator';

export class CreateCheckoutDto {
    payment: string;

    @IsNotEmpty()
    @IsPositive()
    total: number;

    @IsNotEmpty()
    user_id: number;

    secret: string;
}