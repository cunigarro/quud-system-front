import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CreateProjectBody,
  CreateProjectResponse,
  Project,
  ProjectResponse,
  ProjectsResponse,
} from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/api/v1/projects`;

  constructor(private http: HttpClient) {}

  createProject(data: CreateProjectBody): Observable<Project> {
    return this.http
      .post<CreateProjectResponse>(`${this.baseUrl}/`, data)
      .pipe(map((res) => res.data.project));
  }

  projects(): Observable<Project[]> {
    return this.http
      .get<ProjectsResponse>(`${this.baseUrl}/`)
      .pipe(map((res) => res.data.projects));
  }

  project(projectId: number): Observable<Project> {
    return this.http
      .get<ProjectResponse>(`${this.baseUrl}/${projectId}`)
      .pipe(map((res) => res.data.project));
  }
}
