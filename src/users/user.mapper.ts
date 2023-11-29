import {CreateUserDto} from "./create-user.dto";
import {User} from "./user.entity";
import {Injectable} from "@nestjs/common";
import {plainToClass} from "class-transformer";

@Injectable()
export class UserMapper{

    userDTOToUser(userDTO: CreateUserDto): User{
        return plainToClass(User, userDTO)
    }

    userToUserDTOto(user : User){
        return plainToClass(CreateUserDto, user)
    }

}