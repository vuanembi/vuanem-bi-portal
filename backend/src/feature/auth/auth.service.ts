import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { Token } from './token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    getJwt(id: number) {
        return this.jwtService.sign(<Token>{ id });
    }

    getUserFromAuthenticationToken(token: string) {
        const payload = this.jwtService.verify<Token>(token);
        return this.userService.getOne(payload.id);
    }
}
