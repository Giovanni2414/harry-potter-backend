import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {CreateReviewDto} from "./review.dto";
import {ReviewMapper} from "./review.mapper";

@Controller('reviews')
export class ReviewController {
    constructor(private reviewService: ReviewService, private reviewMapper: ReviewMapper) {
    }

    @Post()
    async create(@Body() createReviewDto: CreateReviewDto, @Res() response) {
        try {
            const createdReview: CreateReviewDto = await this.reviewService.create(createReviewDto);
            response.status(HttpStatus.CREATED).send(createdReview)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get()
    async findAll(@Res() response) {
        try {
            const reviews: CreateReviewDto[] = await this.reviewService.findAll();
            response.status(HttpStatus.OK).send(reviews)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response) {
        try {
            const review: CreateReviewDto = await this.reviewService.findOneById(+id);
            response.status(HttpStatus.OK).send(review)
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateReviewDto: CreateReviewDto, @Res() response) {
        try {
            const updatedReview:CreateReviewDto = await this.reviewService.update(+id, updateReviewDto);
            response.status(HttpStatus.OK).send(updatedReview)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response) {
        try{
            await this.reviewService.remove(+id);
            response.status(HttpStatus.OK).send('Brand successfully removed')
        } catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get("product/:id")
    async findProductReview(@Param('id') id: string, @Res() response){
        try{
            const reviews: CreateReviewDto[] = await this.reviewService.findProductReview(+id)
            response.status(HttpStatus.OK).send(reviews)
        }catch (e) {
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }
}
