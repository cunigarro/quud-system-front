import { LoginResponse, RegisterResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateProjectDto, CreateProjectResponse, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/api/v1/projects`;

  constructor(private http: HttpClient) {}

  createProject(data: CreateProjectDto): Observable<CreateProjectResponse> {
    return this.http.post<CreateProjectResponse>(`${this.baseUrl}/`, data);
  }

  projects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/`)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
