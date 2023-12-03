import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewMapper } from './review.mapper';
import {Review} from "./review.entity";
import {CreateReviewDto} from "./review.dto";
import {ErrorCodes} from "../constants/ErrorConstants";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly reviewMapper: ReviewMapper,
    ) {}

    async create(createReviewDto: CreateReviewDto): Promise<CreateReviewDto> {
        try{
            const newReview = this.reviewRepository.create(createReviewDto);
            const savedReview = await this.reviewRepository.save(newReview);
            return this.reviewMapper.mapToDto(savedReview);
        } catch (e){
            throw e
        }
    }

    async findAll(): Promise<CreateReviewDto[]> {
        try{
            const reviews: Review[] = await this.reviewRepository.find();
            return reviews.map(review => this.reviewMapper.mapToDto(review));
        } catch (e){
            throw e
        }
    }

    async findOneById(id: number): Promise<CreateReviewDto> {
        try{
            const review:Review = await this.reviewRepository.findOneBy({review_id:id});
            if(review!==null){
                return this.reviewMapper.mapToDto(review);
            }else{
                throw new Error(ErrorCodes.REVIEW_NOT_FOUND)
            }
        } catch (e){
            throw e
        }
    }

    async update(id: number, updateReviewDto: CreateReviewDto): Promise<CreateReviewDto> {
        try {
            await this.findOneById(id)
            await this.reviewRepository.update(id, updateReviewDto);
            const updatedReview = await this.reviewRepository.findOneBy({review_id: id});
            return this.reviewMapper.mapToDto(updatedReview);
        }catch (e){
            throw e
        }
    }

    async remove(id: number): Promise<void> {
        try{
            await this.findOneById(id)
            await this.reviewRepository.delete(id);
        } catch (e){
            throw e
        }
    }

    async findProductReview(id: number): Promise<CreateReviewDto[]>{
        try{
            const reviews: Review[] = await this.reviewRepository.find({
                where: {
                    product_id: id
                }
            });
            if(reviews!==null){
                return reviews.map(review => this.reviewMapper.mapToDto(review));
            }else{
                throw new Error(ErrorCodes.REVIEW_NOT_FOUND)
            }
        } catch (e){
            throw e
        }
    }
}
