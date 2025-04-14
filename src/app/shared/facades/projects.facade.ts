import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { CreateProjectDto, CreateProjectResponse, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  private projectsService = inject(ProjectsService);

  private _projects = signal<Project[] | null>(null);

  readonly projects = computed(() => this._projects());

  createProject(data: CreateProjectDto): Observable<CreateProjectResponse> {
    return this.projectsService.createProject(data);
  }

  loadProjects(): Observable<Project[]> {
    if (!this._projects()) {
      return this.projectsService.projects()
        .pipe(
          tap((data) => this._projects.set(data))
        )
    }

    return of(this._projects()!);
  }
}
