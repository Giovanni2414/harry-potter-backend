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
import {Checkout} from "./checkouts/checkout.entity";
import {CheckoutModule} from "./checkouts/checkout.module";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {BrandController} from "./brands/brand.controller";
import {AdminMiddleware} from "./middleware/admin.middleware";

@Module({
    imports: [AuthModule,
        UsersModule,
        ProductModule,
        BrandModule,
        ReviewModule,
        CheckoutModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mypassword',
            database: 'ecommerce',
            entities: [User, Brand, Product, Review, Checkout],
            synchronize: false,
        })
    ],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminMiddleware).forRoutes(
            {path: "products", method: RequestMethod.PUT},
            {path: "products/*", method: RequestMethod.DELETE},
            {path: "products/*", method: RequestMethod.POST},
            {path:"brands/*", method:RequestMethod.PUT},
            {path:"brands/*", method:RequestMethod.DELETE},
            {path:"brands/*", method:RequestMethod.POST},
            BrandController,
            {path: "reviews/*", method: RequestMethod.PUT},
            {path: "reviews/*", method: RequestMethod.DELETE},
            {path: "users/*", method: RequestMethod.PUT},
            {path: "users/*", method: RequestMethod.DELETE}
        )
        consumer.apply(AuthMiddleware).forRoutes(
            {path: "reviews", method: RequestMethod.POST},
            {path: "reviews/*", method: RequestMethod.GET},
        );
    }

    constructor(private dataSource: DataSource) {
    }
}
