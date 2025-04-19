import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { Login, LoginBody, LoginResponse, Register, RegisterResponse, RegisterUserBody } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private authService: AuthService) {}

  registerUser(data: RegisterUserBody): Observable<Register> {
    return this.authService.register(data).pipe(
      map((authData: RegisterResponse) => ({
        token: authData.data.access_token
      })),
      tap(data => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  loginUser(credentials: LoginBody): Observable<Login> {
    return this.authService.login(credentials).pipe(
      map((authData: LoginResponse) => ({
        token: authData.data.token.access_token
      })),
      tap(data => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  logoutUser(): Observable<void> {
    return this.authService.logout().pipe(
      tap(() => {
        localStorage.removeItem('token');
      })
    );
  }
}
