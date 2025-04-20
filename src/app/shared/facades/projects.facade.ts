import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Observable, of, tap } from 'rxjs';
import { CreateProjectBody, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  private projectsService = inject(ProjectsService);

  private _projects = signal<Project[] | null>(null);

  readonly projects = computed(() => this._projects());

  createProject(data: CreateProjectBody): Observable<Project> {
    return this.projectsService.createProject(data);
  }

  loadProjects(): Observable<Project[]> {
    // if (!this._projects()) { // TODO: Implement better cache
    if(true) {
      return this.projectsService.projects()
        .pipe(
          tap((data) => this._projects.set(data))
        )
    }

    return of(this._projects()!);
  }

  project(projectId: number): Observable<Project> {
    const project = this._projects()?.find(project => project.id === projectId)
    if(!project) {
      return this.projectsService.project(projectId)
    }

    return of(project);
  }

  reset() {
    this._projects.set(null);
  }
}
