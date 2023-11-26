import {Module} from '@nestjs/common';
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
            synchronize: true,
        })
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
