import { Controller, Injectable, Body, Param, Post, Get, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';

@Injectable()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    getUser(@Param('id') id: string): any {
        // Optionally validate id here
        return this.usersService.getUser(id);
    }

    @Get()
    getUsers(): User[] {
        return this.usersService.getUsers();
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    createUser(@Body() createUserData: CreateUserInput): any {
        return this.usersService.createUser(createUserData);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserData: any): any {
        // Add UpdateUserDto for validation as needed
        return this.usersService.updateUser(id, updateUserData);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): any {
        return this.usersService.deleteUser(id);
    }
}