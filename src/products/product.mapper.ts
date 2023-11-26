import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateProductDto} from "./product.dto";
import {Product} from "./product.entity";

@Injectable()
export class ProductMapper {
    mapToEntity(dto: CreateProductDto): Product {
        return plainToClass(Product, dto);
    }

    mapToDto(entity: Product): CreateProductDto {
        return plainToClass(CreateProductDto, entity);
    }
}