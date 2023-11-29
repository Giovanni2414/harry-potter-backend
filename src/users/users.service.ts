import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {User} from './user.entity';
import {CreateUserDto} from "./create-user.dto";
import {ProductMapper} from "../products/product.mapper";
import {UserMapper} from "./user.mapper";
import {Product} from "../products/product.entity";
import {ErrorCodes} from "../constants/ErrorConstants";

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userMapper: UserMapper
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(user_id: number): Promise<User | null> {
    try{
      const user: User = await this.usersRepository.findOneBy({ user_id });
      if(user!==null){
        return user
      }else{
        throw new Error(ErrorCodes.USER_NOT_FOUND)
      }
    } catch (e){
      throw e
    }
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({
      username: Like(`%${username}%`)
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({
      email: Like(`%${email}%`)
    });
  }

  save(user: User) {
    return this.usersRepository.save(user)
  }

  async update(user_id: number, updateUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      await this.findOneById(user_id)
      await this.usersRepository.update(user_id, updateUserDto);
      const updatedProduct = await this.usersRepository.findOneBy({user_id});
      return this.userMapper.userToUserDTOto(updatedProduct);
    }catch (e){
      throw e
    }
  }

  async remove(user_id: number): Promise<void> {
    try{
      await this.findOneById(user_id)
      await this.usersRepository.delete(user_id);
    }catch (e){
      throw e
    }
  }
}