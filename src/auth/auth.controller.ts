import {Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {CreateUserDto} from "../users/create-user.dto";
import {UserMapper} from "../users/user.mapper";
import {LoginUserDto} from "./login-user.dto";
import {LoginUserMapper} from "./login-user.mapper";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userMapper: UserMapper, private loginUserMapper: LoginUserMapper) {
    }

    @Post('login')
    signIn(@Body() loginUserDto: LoginUserDto, @Res() response) {
        this.authService.signIn(this.loginUserMapper.loginUserDTOToLoginUser(loginUserDto)).then((res)=>{
            response.status(HttpStatus.OK).json(res)
        }).catch((e)=>{
            response.status(HttpStatus.BAD_REQUEST).send(e)
        })
    }

    @Post('signUp')
    signUp(@Body() createUserDto: CreateUserDto, @Res() response: any){
        this.authService.createUser(this.userMapper.userDTOToUser(createUserDto)).then((res)=>{
            response.status(HttpStatus.OK).json(res)
        }).catch((e)=>{
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        })
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}