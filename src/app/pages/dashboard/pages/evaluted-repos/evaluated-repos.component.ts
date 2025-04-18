import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EvaluationsFacade } from '../../../../shared/facades/evaluations.facade';
import { Evaluation } from '../../../../shared/models/evaluation.model';
import { RouterModule } from '@angular/router';
import { LanguageFacade } from '../../../../shared/facades/language.facade';
import { Language } from '../../../../shared/models/language.model';

@Component({
  templateUrl: './evaluated-repos.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
})
export class EvaluatedReposComponent implements OnInit {
  private _evaluationsFacade = inject(EvaluationsFacade);
  private _languageFacade = inject(LanguageFacade);
  evaluations!: Signal<Evaluation[] | null>;
  languages!: Signal<Language[] | null>;

  ngOnInit(): void {
    this._evaluationsFacade.loadEvaluations();
    this.evaluations = this._evaluationsFacade.evaluations;

    this._languageFacade.loadLanguages();
    this.languages = this._languageFacade.languages;
  }

  languageName(languageId: number) {
    return this.languages()?.find(language => language.id === languageId)?.name;
  }
}
