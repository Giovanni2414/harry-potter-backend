import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {User} from './users/user.entity';
import {ProductModule} from "./products/product.module";
import {Product} from "./products/product.entity";
import {Brand} from "./brands/brand.entity";
import {Review} from "./reviews/review.entity";
import {BrandModule} from "./brands/brand.module";
import {ReviewModule} from "./reviews/review.module";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {BrandController} from "./brands/brand.controller";
import {ProductController} from "./products/product.controller";
import {AdminMiddleware} from "./middleware/admin.middleware";

@Module({
    imports: [AuthModule,
        UsersModule,
        ProductModule,
        BrandModule,
        ReviewModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mypassword',
            database: 'ecommerce',
            entities: [User, Brand, Product, Review],
            synchronize: false,
        }),
    ],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminMiddleware).forRoutes(
            {path: "products", method: RequestMethod.PUT},
            {path: "products", method: RequestMethod.DELETE},
            {path: "products", method: RequestMethod.POST},
            BrandController,
            {path: "reviews", method: RequestMethod.PUT},
            {path: "reviews", method: RequestMethod.DELETE},
        )
        consumer.apply(AuthMiddleware).forRoutes(
            {path: "reviews", method: RequestMethod.POST},
            {path: "reviews/*", method: RequestMethod.GET},
        );
    }

    constructor(private dataSource: DataSource) {
    }
}
