import { Body, Controller ,Get, Injectable} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./Dto/login.dto";
 
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService:AuthService) {}

    @Get('login')
    login(@Body() logindata:LoginDto): { access: string } {
        return this.AuthService.login( logindata);
    }
    @Get('reset-password')
    restPassword(@Body('email') email:string): string {
        return this.AuthService.restPassword(email);
    }
    @Get('update-password')
    updatePassword(@Body('token') token:string,@Body('newPassword') newPassword:string): string {
        return this.AuthService.updatePassword(token,newPassword);
    }
}