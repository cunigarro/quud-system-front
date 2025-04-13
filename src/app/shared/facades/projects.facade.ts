import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjecstService } from '../services/projects.service';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { CreateProjectDto, CreateProjectResponse, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  private projectsService = inject(ProjecstService);

  private _projects = signal<Project[] | null>(null);

  readonly projects = computed(() => this._projects());

  createProject(data: CreateProjectDto): Observable<CreateProjectResponse> {
    return this.projectsService.createProject(data);
  }

  loadProjects(): Observable<Project[]> {
    if (!this._projects()) {
      return this.projectsService.projects()
        .pipe(
          catchError(() => {
            return of([
              {
                id: 1,
                name: 'Proyecto de respaldo',
                updated_at: new Date(),
                created_at: new Date(),
                language_version_id: 1,
                url: 'https://github.com/cunigarro/quud'
              }
            ]);
          }),
          tap((data) => this._projects.set(data))
        )
    }

    return of(this._projects()!);
  }
}
