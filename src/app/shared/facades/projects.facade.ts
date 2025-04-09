import { Injectable } from '@angular/core';
import { ProjecstService } from '../services/projects.service';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  constructor(private projectsService: ProjecstService) {}

  createProject(data: any): any {
    return this.projectsService.createProject(data);
  }
}
