import {IsNotEmpty, IsString} from "class-validator";

export class LoginUserDto{

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string

    constructor(username:string, password:string ) {
        this.username = username;
        this.password = password;
    }
}