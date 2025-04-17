import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateProjectDto, CreateProjectResponse, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class RulesService {
  private baseUrl = `${environment.apiUrl}/api/v1/rules/rules`;

  constructor(private http: HttpClient) {}

  createRulesGroup(data: CreateProjectDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/groups`, data);
  }

  rulesGroups(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/groups`)
      .pipe(
        map((res: any) => res.data.groups)
      );
  }

  rules(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`)
      .pipe(
        map((res: any) => res.data.rules)
      );
  }
}
