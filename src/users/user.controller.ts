import {Body, Controller, Delete, Get, HttpStatus, Param, Put, Res} from "@nestjs/common";
import {CreateUserDto} from "./create-user.dto";
import {UsersService} from "./users.service";
import {UserMapper} from "./user.mapper";
import {User} from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private usersService: UsersService, private userMapper: UserMapper, ) {}

    @Get()
    async findAll(@Res() response){
        try{
            const users: CreateUserDto[] = await this.usersService.findAll();
            response.status(HttpStatus.OK).send(users)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response) {
        try{
            const user:User = await this.usersService.findOneById(+id);
            response.status(HttpStatus.OK).send(this.userMapper.userToUserDTOto(user))
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto, @Res() response){
        try{
            const updatedUser = await this.usersService.update(+id, updateUserDto);
            response.status(HttpStatus.OK).send(updatedUser)
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response){
        try{
            await this.usersService.remove(+id);
            response.status(HttpStatus.OK).send('Product successfully removed')
        }catch (e){
            response.status(HttpStatus.BAD_REQUEST).send(e.message)
        }
    }
}