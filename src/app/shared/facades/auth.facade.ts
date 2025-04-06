import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private authService: AuthService) {}

  registerUser(data: any): Observable<{ token: string }> {
    return this.authService.register(data).pipe(
      map((authData: RegisterResponse) => ({
        token: authData.data.token.access_token
      }))
    );
  }

  loginUser(credentials: any): Observable<any> {
    return this.authService.login(credentials).pipe(
      map((authData: LoginResponse) => ({
        token: authData.data.token.access_token
      }))
    );
  }
}
