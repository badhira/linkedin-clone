import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    hashPassword(password: string): Observable<string>;
    registerAccount(user: User): Observable<User>;
    validateUser(email: string, password: string): Observable<User>;
    login(user: User): Observable<string>;
}
