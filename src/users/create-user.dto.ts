import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    readonly username: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly phone: string;

    @IsString()
    readonly address: string;

    @Matches(/^(?=.*[A-Z])(?=.*[*#$%]).+$/, { message: 'La cadena debe contener al menos una letra mayúscula y uno de los siguientes caracteres: * # $ %' })
    readonly password: string;

    @IsString()
    readonly role: string;


    constructor(email: string, username: string, firstName: string, lastName: string, phone: string, address: string, password: string, role: string) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.role = role
    }
}