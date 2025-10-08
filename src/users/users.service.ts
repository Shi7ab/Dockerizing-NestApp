import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
}
