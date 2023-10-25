import {LoginUserDto} from "./login-user.dto";
import {LoginUser} from "./login-user.entity";

export class LoginUserMapper {

    loginUserDTOToLoginUser(loginUserDTO: LoginUserDto) {
        return new LoginUser(loginUserDTO.username, loginUserDTO.password)
    }

    loginUserToLoginUserDTO(loginUser: LoginUser) {
        return new LoginUserDto(loginUser.username, loginUser.password)
    }
}