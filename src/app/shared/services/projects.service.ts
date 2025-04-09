import { LoginResponse, RegisterResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjecstService {
  private baseUrl = `${environment.apiUrl}/api/v1/projects`;

  constructor(private http: HttpClient) {}

  createProject(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/`, data);
  }
}
