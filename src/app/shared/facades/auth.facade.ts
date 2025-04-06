import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private authService: AuthService) {}

  registerUser(data: any): Observable<{ token: string }> {
    return this.authService.register(data).pipe(
      map((authData: RegisterResponse) => ({
        token: authData.data.token.access_token
      })),
      tap(data => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  loginUser(credentials: any): Observable<{ token: string }> {
    return this.authService.login(credentials).pipe(
      map((authData: LoginResponse) => ({
        token: authData.data.token.access_token
      })),
      tap(data => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  logoutUser(): Observable<any> {
    localStorage.removeItem('token');
    return this.authService.logout();
  }
}
