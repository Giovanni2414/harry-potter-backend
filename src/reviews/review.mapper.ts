import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateReviewDto} from "./review.dto";
import {Review} from "./review.entity";

@Injectable()
export class ReviewMapper {
    mapToEntity(dto: CreateReviewDto): Review {
        return plainToClass(Review, dto);
    }

    mapToDto(entity: Review): CreateReviewDto {
        return plainToClass(CreateReviewDto, entity);
    }
}