import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/user.entity";
import {UserMapper} from "../users/user.mapper";
import {ErrorCodes} from "../constants/ErrorConstants";
import {LoginUser} from "./login-user.entity";
import {encryptPassword, verifyPassword} from "../tools/encryptData";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private userMapper: UserMapper) {
    }

    async signIn(loginUser: LoginUser): Promise<any> {
        const user = await this.usersService.findOneByUsername(loginUser.username);
        if (!verifyPassword(loginUser.password, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = {user_id: user.id, username: user.username, role: user.role};
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: 60*10
            }),
        };

    }

    async createUser(user: User) {
        try{
            await this.usersService.findOneByEmail(user.email).then((res) => {
                if (res!==null){
                    throw new Error(ErrorCodes.EMAIL_ALREADY_USED)
                }
            })
            await this.usersService.findOneByUsername(user.username).then((res)=>{
                if (res!==null){
                    throw new Error(ErrorCodes.USERNAME_NOT_AVAILABLE)
                }
            })
            const userEncrypt = await encryptPassword(user)
            userEncrypt.role = 'client'
            const userSaved = await this.usersService.save(userEncrypt)
            return this.userMapper.userToUserDTOto(userSaved)
        }catch (e) {
            throw e
        }
    }

}