import {TypeOrmModule} from "@nestjs/typeorm";
import {Review} from "./review.entity";
import {ReviewService} from "./review.service";
import {ReviewMapper} from "./review.mapper";
import {ReviewController} from "./review.controller";
import {Module} from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    providers: [ReviewService, ReviewMapper],
    controllers: [ReviewController],
    exports: [ReviewService, ReviewMapper]
})

export class ReviewModule {}