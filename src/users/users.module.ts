import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import {UserMapper} from "./user.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserMapper],
  exports: [UsersService, UserMapper],
})
export class UsersModule {}
