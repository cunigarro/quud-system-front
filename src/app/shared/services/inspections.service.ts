import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, pipe } from 'rxjs';
import { Inspection, CreateInspectionResponse, InspectionsResponse, CreateInspection } from '../models/inspection.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/api/v1/inspections`;

  constructor(private http: HttpClient) {}

  createInspection(data: CreateInspection): Observable<Inspection> {
    return this.http.post<CreateInspectionResponse>(`${this.baseUrl}/`, data)
      .pipe(
        map(res => res.data.inspection)
      );
  }

  inspections(): Observable<Inspection[]> {
    return this.http.get<InspectionsResponse>(`${this.baseUrl}/`)
      .pipe(
        map(res => res.data.inspections)
      );
  }
}
