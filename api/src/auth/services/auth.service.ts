import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';
import { Any, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: User): Observable<User> {
    const { firstName, lastName, email, password } = user;

    return this.hashPassword(password).pipe(
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: User) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }
  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOneOptions<UserEntity>(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }
  login(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          //create Jwt creditionals
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
