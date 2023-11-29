import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';

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
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ user_id: id });
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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}