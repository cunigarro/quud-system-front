import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjecstService } from '../services/inspections.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Inspection } from '../models/inspection.model';

@Injectable({ providedIn: 'root' })
export class InspectionsFacade {
  private inspectionsService = inject(ProjecstService);

  private _inspections = signal<Inspection[] | null>(null);

  readonly inspections = computed(() => this._inspections());

  createInspection(data: any): Observable<any> {
    return this.inspectionsService.createInspection(data);
  }

  loadInspections(): Observable<Inspection[]> {
    if (!this._inspections()) {
      return this.inspectionsService.inspections()
        .pipe(
          tap((data) => this._inspections.set(data))
        );
    }

    return of(this._inspections()!);
  }
}
