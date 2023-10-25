import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {User} from './users/user.entity';

@Module({
    imports: [AuthModule, UsersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mypassword',
            database: 'ecommerce',
            entities: [User],
            synchronize: true,
        })
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
