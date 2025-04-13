import { Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProjectsFacade } from '../../../../shared/facades/projects.facade';
import { Project } from '../../../../shared/models/project.model';

@Component({
  templateUrl: './evaluated-repos.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class EvaluatedReposComponent implements OnInit {
  projects!: Signal<Project[] | null>;

  constructor(
    private projectsFacade: ProjectsFacade
  ) {}

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
    this.projects = this.projectsFacade.projects;
  }
}
