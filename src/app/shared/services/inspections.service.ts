import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection, InspectionResponse, Inspections } from '../models/inspection.model';

@Injectable({ providedIn: 'root' })
export class ProjecstService {
  private baseUrl = `${environment.apiUrl}/api/v1/inspections`;

  constructor(private http: HttpClient) {}

  createInspection(data: any): Observable<InspectionResponse> {
    return this.http.post<InspectionResponse>(`${this.baseUrl}/`, data);
  }

  inspections(): Observable<InspectionResponse> {
    return this.http.get<InspectionResponse>(`${this.baseUrl}/`);
  }
}
