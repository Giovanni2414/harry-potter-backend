import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ProductService} from "./product.service";
import {ProductMapper} from "./product.mapper";
import {ProductController} from "./product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService, ProductMapper],
    controllers: [ProductController],
    exports: [ProductService, ProductMapper],
})

export class ProductModule {}