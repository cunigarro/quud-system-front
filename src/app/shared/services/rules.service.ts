import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateRulesGroupBody, CretateRulesGroupResponse, Rule, RuleResponse, RulesGroup, RulesGroupResponse } from '../models/rule.model';

@Injectable({ providedIn: 'root' })
export class RulesService {
  private baseUrl = `${environment.apiUrl}/api/v1/rules/rules`;

  constructor(private http: HttpClient) {}

  createRulesGroup(data: CreateRulesGroupBody): Observable<RulesGroup> {
    return this.http.post<CretateRulesGroupResponse>(`${this.baseUrl}/groups`, data)
      .pipe(
        map(res => res.data.group)
      );
  }

  rulesGroups(): Observable<RulesGroup[]> {
    return this.http.get<RulesGroupResponse>(`${this.baseUrl}/groups`)
      .pipe(
        map(res => res.data.groups)
      );
  }

  rules(): Observable<Rule[]> {
    return this.http.get<RuleResponse>(`${this.baseUrl}`)
      .pipe(
        map(res => res.data.rules)
      );
  }
}
