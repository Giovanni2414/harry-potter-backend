import {CreateUserDto} from "./create-user.dto";
import {User} from "./user.entity";

export class UserMapper{

    userDTOToUser(userDTO: CreateUserDto){
        return new User(userDTO.email, userDTO.username,  userDTO.firstName, userDTO.lastName, userDTO.phone, userDTO.address, userDTO.password, userDTO.role)
    }

    userToUserDTOto(user : User){
        return new CreateUserDto(user.email, user.username, user.firstName, user.lastName, user.phone, user.address, user.password, user.role)
    }

}