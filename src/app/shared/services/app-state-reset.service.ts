import { Injectable } from '@angular/core';
import { EvaluationsFacade } from '../facades/evaluations.facade';
import { InspectionsFacade } from '../facades/inspections.facade';
import { LanguageFacade } from '../facades/language.facade';
import { ProfileFacade } from '../facades/profile.facade';
import { ProjectsFacade } from '../facades/projects.facade';
import { RulesFacade } from '../facades/rules.facade';

@Injectable({ providedIn: 'root' })
export class AppStateResetService {
  constructor(
    private evaluations: EvaluationsFacade,
    private inspections: InspectionsFacade,
    private languages: LanguageFacade,
    private profile: ProfileFacade,
    private projects: ProjectsFacade,
    private rules: RulesFacade
  ) {}

  resetAll(): void {
    this.evaluations.reset();
    this.inspections.reset();
    this.languages.reset();
    this.profile.reset();
    this.projects.reset();
    this.rules.reset();
  }
}
