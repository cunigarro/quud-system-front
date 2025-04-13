import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjecstService } from '../services/projects.service';
import { catchError, finalize, Observable, of } from 'rxjs';
import { CreateProjectDto, CreateProjectResponse, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  private projectsService = inject(ProjecstService);

  private _projects = signal<Project[] | null>(null);

  readonly projects = computed(() => this._projects());

  createProject(data: CreateProjectDto): Observable<CreateProjectResponse> {
    return this.projectsService.createProject(data);
  }

  loadProjects() {
    if (!this._projects()) {
      this.projectsService.projects()
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
      )
      .subscribe({
        next: (data) => this._projects.set(data),
        error: (err) => console.error('Error loading projects', err),
      });
    }
  }
}
