import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateCheckoutDto} from "./checkout.dto";
import {Checkout} from "./checkout.entity";

@Injectable()
export class CheckoutMapper {
    mapToEntity(dto: CreateCheckoutDto): Checkout {
        return plainToClass(Checkout, dto);
    }

    mapToDto(entity: Checkout): CreateCheckoutDto {
        return plainToClass(CreateCheckoutDto, entity);
    }
}