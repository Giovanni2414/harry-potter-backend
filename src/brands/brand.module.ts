import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Brand} from "./brand.entity";
import {ProductService} from "../products/product.service";
import {ProductMapper} from "../products/product.mapper";
import {ProductController} from "../products/product.controller";
import {BrandService} from "./brand.service";
import {BrandMapper} from "./brand.mapper";
import {BrandController} from "./brand.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Brand])],
    providers: [BrandService, BrandMapper],
    controllers:[BrandController],
    exports:[BrandService,BrandMapper]
})

export class BrandModule {}