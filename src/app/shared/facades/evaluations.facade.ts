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
        const evaluations: Evaluation[] = projects.map(project => {
          const inspection = inspections.find(i => i.project.id === project.id);

          const evaluation: Evaluation = {
            ...project,
            branch: inspection?.branch ?? '',
            project: inspection?.project!,
            rule_group: inspection?.rule_group!
          };

          return evaluation;
        });

        this._evaluations.set(evaluations);
      })
    ).subscribe();
  }

  reset() {
    this._evaluations.set(null);
  }
}
