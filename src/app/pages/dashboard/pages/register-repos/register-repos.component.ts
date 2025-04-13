import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LanguageFacade } from '../../../../shared/facades/language.facade';
import { Language, LanguageVersion } from '../../../../shared/models/language.model';
import { ProjectsFacade } from '../../../../shared/facades/projects.facade';

@Component({
  templateUrl: './register-repos.component.html',
  styleUrl: './register-repos.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class RegisterReposComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  isLinear = false;
  languages!: Signal<Language[] | null>;
  selectedLanguageVersions = signal<LanguageVersion[] | null>(null);

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    url: ['', Validators.required],
    language_id: [null, Validators.required],
    language_version_id: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    branch: ['', Validators.required],
    qualityRulesGroup: ['', Validators.required],
  });

  constructor(
    private languageFacade: LanguageFacade,
    private projectsFacade: ProjectsFacade
  ){}

  ngOnInit(): void {
    this.languageFacade.loadLanguages();
    this.languages = this.languageFacade.languages;

    this.firstFormGroup.get('language_id')?.valueChanges.subscribe(selectedId => {
      const lang = this.languages()?.find(l => l.id === selectedId);
      this.selectedLanguageVersions.set(lang?.versions ?? null);

      if (!lang) {
        this.firstFormGroup.get('language_version_id')?.disable();
      } else {
        this.firstFormGroup.get('language_version_id')?.enable();
      }

      this.firstFormGroup.get('language_version_id')?.reset();
    });

    this.firstFormGroup.get('language_version_id')?.disable();
  }

  registerProject() {
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }

    this.projectsFacade.createProject(this.firstFormGroup.value)
      .subscribe(() => {
      });
  }
}
