import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Inspection, InspectionResponse } from '../models/inspection.model';

@Injectable({ providedIn: 'root' })
export class ProjecstService {
  private baseUrl = `${environment.apiUrl}/api/v1/inspections`;

  constructor(private http: HttpClient) {}

  createInspection(data: any): Observable<InspectionResponse> {
    return this.http.post<InspectionResponse>(`${this.baseUrl}/`, data);
  }

  inspections(): Observable<Inspection[]> {
    // return this.http.get<Inspection[]>(`${this.baseUrl}/`);

    return of([
      {
        branch: 'main',
        project_id: 2,
        rule_group_id: 1
      }
    ]);
  }
}
