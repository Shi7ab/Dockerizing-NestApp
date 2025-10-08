import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './Dto/login.dto';
import { LoginResponse } from './Dto/models/Login-response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginData') loginData: LoginDto) {
    
    console.log('Login data:', loginData);
    console.log('Users:', this.authService['userservice'].getUsers());

    return this.authService.login(loginData);
  }

  @Query(() => String)
  resetPassword(@Args('email') email: string): string {
    return this.authService.restPassword(email);
  }

  @Mutation(() => String)
  updatePassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string
  ): string {
    return this.authService.updatePassword(token, newPassword);
  }
}
