import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateBrandDto} from "./brand.dto";
import {Brand} from "./brand.entity";

@Injectable()
export class BrandMapper {
    mapToEntity(dto: CreateBrandDto): Brand {
        return plainToClass(Brand, dto);
    }

    mapToDto(entity: Brand): CreateBrandDto {
        return plainToClass(CreateBrandDto, entity);
    }
}