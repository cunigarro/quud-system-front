import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, pipe } from 'rxjs';
import { Inspection, InspectionResponse } from '../models/inspection.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/api/v1/inspections`;

  constructor(private http: HttpClient) {}

  createInspection(data: any): Observable<InspectionResponse> {
    return this.http.post<InspectionResponse>(`${this.baseUrl}/`, data);
  }

  inspections(): Observable<Inspection[]> {
    return this.http.get<any>(`${this.baseUrl}/`)
      .pipe(
        map(res => res.data.inspections)
      );
  }
}
