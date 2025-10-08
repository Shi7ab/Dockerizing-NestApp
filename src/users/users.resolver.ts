/* user.resolver.ts */

import { Resolver , Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user'
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdatedUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';


@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

   @Query(()=> User, {name: 'helloUser',nullable: true})
   getUser(@Args() getuserArgs:GetUserArgs): User {
        return this.usersService.getUser(getuserArgs.userId);
   }

     @Query(() => [User], { name: 'helloUsers', nullable: true })
     getUsers(@Args() getuserArgs: GetUsersArgs): User[] {
     return this.usersService.getUsers();
     }
   
   @Mutation(() => User)
   async createUser(@Args('createUserData') createUserData:CreateUserInput): Promise<User> {
        const result = await this.usersService.createUser(createUserData);
        return result.user; // Return only the user object
   }
   
   @Mutation(() => String)
   updateUser(
        @Args('id') id: string,
        @Args('updateUserData') updateUserData: UpdatedUserInput
   ): String {
        return this.usersService.updateUser(id, updateUserData);
   }

   @Mutation(() => String)
   deleteUser(@Args('deleteuserData') deleteUserData:DeleteUserInput): String {
        return  this.usersService.deleteUser(deleteUserData.userid);
   }
}