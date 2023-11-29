import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Brand} from "./brand.entity";
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