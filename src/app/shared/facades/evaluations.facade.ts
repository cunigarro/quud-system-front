import { Injectable, signal, computed, inject } from '@angular/core';
import { ProjectsFacade } from './projects.facade';
import { InspectionsFacade } from './inspections.facade';
import { forkJoin, map } from 'rxjs';
import { Evaluation } from '../models/evaluation.model';

@Injectable({ providedIn: 'root' })
export class EvaluationsFacade {
  private projectsFacade = inject(ProjectsFacade);
  private inspectionsFacade = inject(InspectionsFacade);

  private _evaluations = signal<Evaluation[] | null>(null);

  readonly evaluations = computed(() => this._evaluations());

  loadEvaluations() {
    forkJoin({
      projects: this.projectsFacade.loadProjects(),
      inspections: this.inspectionsFacade.loadInspections()
    }).pipe(
      map(({ projects, inspections }) => {
        const evaluation: Evaluation[] = projects
          .map(project => {
            const inspection = inspections.find(i => i.project_id === project.id);
            if (!inspection) return null;

            return {
              ...project,
              ...inspection
            } as Evaluation;
          })
          .filter((e): e is Evaluation => e !== null);

        this._evaluations.set(evaluation);
      })
    ).subscribe();
  }
}
