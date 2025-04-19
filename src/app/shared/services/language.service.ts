import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language, LanguageResponse } from '../models/language.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  language(): Observable<Language[]> {
    return this.http.get<LanguageResponse>(`${this.baseUrl}/languages/`)
      .pipe(
        map(res => res.data.languages)
      );
  }
}
