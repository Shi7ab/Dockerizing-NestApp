import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userservice:UsersService,
        private readonly jwtService:JwtService
    ) {}

    async validateUsrer(username: string, pass: string): Promise<any> {
        const user = this.userservice.getUsers().find(user => user.username === username);

        // لو المستخدم ما موجود
        if (!user) {
            throw new UnauthorizedException('Invalid username');
        }

        // نقارن الباسورد
        // const match = await bycrypt.compare(pass, user.password);
        const match = pass === user.password;


        if (!match) {
            throw new UnauthorizedException('Invalid password');
        }

        // نحذف الباسورد من الريسبونس
        const { password, ...result } = user;
        return result;
    }


  login(userDto: LoginDto): { access: string } {
    const user = this.userservice.getUsers().find(
        (user) => user.username === userDto.username
    );

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // مقارنة الباسورد مؤقتاً بدون bcrypt
    if (user.password !== userDto.password) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.userId };
    return {
        access: this.jwtService.sign(payload),
    };
    
 }


    restPassword(email:string): string {
         const user = this.userservice.getUsers().find(user => user.email === email);
         if(!user){
            throw new  UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.userId };
        const token = this.jwtService.sign(payload, {expiresIn:'15m'});
        const link = `http://localhost:3000/auth/reset-password?token=${token}`;
        
        return link;

    }
    
    updatePassword(token:string,newPassword:string): string {
        const verify = this.jwtService.verify(token);
        if(!verify){
            throw new UnauthorizedException('Invalid token or expired');
        }
        const user = this.userservice.getUsers().find(user => user.userId === verify.sub);
        if(!user){
            throw new UnauthorizedException('User not found');
        }
        const hash = bycrypt.hashSync(newPassword,10);
        user.password = hash;
        return 'Password updated successfully';
    }
    
}