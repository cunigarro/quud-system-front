import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile, ProfileResponse } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/api/v1/auth/user/profile`;

  constructor(private http: HttpClient) {}

  userInfo(): Observable<Profile> {
    return this.http.get<ProfileResponse>(this.baseUrl)
      .pipe(
        map(res => res.data.user)
      );
  }
}
