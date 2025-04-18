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
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LanguageFacade } from '../../../../shared/facades/language.facade';
import { Language, LanguageVersion } from '../../../../shared/models/language.model';
import { ProjectsFacade } from '../../../../shared/facades/projects.facade';
import { CreateProjectDto, Project } from '../../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RulesService } from '../../../../shared/services/rules.service';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { InspectionsFacade } from '../../../../shared/facades/inspections.facade';

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
    AsyncPipe,
    JsonPipe
  ],
})
export class RegisterReposComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _route = inject(ActivatedRoute);

  private _rulesFacade = inject(RulesFacade);
  private _inspectionsFacade = inject(InspectionsFacade);

  isLinear = false;
  languages!: Signal<Language[] | null>;
  rulesGroups!: Signal<any[] | null>;
  selectedLanguageVersions = signal<LanguageVersion[] | null>(null);

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    url: ['', Validators.required],
    language_id: [0, Validators.required],
    language_version_id: [{ value: 0, disabled: true }, Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    branch: ['', Validators.required],
    rule_group_id: ['', Validators.required],
  });

  project$!: Observable<Project | null>;

  constructor(
    private languageFacade: LanguageFacade,
    private projectsFacade: ProjectsFacade
  ){}

  ngOnInit(): void {
    this.languageFacade.loadLanguages();
    this.languages = this.languageFacade.languages;

    this._rulesFacade.loadRulesGroups();
    this.rulesGroups = this._rulesFacade.rulesGroups;

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

    const projectId = this._route.snapshot.paramMap.get('projectId');

    console.log(this.projectsFacade.project(Number(projectId)));

    this.project$ = this.projectsFacade.project(Number(projectId));

    this.projectsFacade.project(Number(projectId)).subscribe(project => {
      this.firstFormGroup.get('language_version_id')?.enable();
      setTimeout(() => {
        this.firstFormGroup.setValue({
          name: project.name,
          url: project.url,
          language_id: project.language_id,
          language_version_id: project.language_version_id
        });
      });
    });
  }

  registerProject() {
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.firstFormGroup.value;

    const dto: CreateProjectDto = {
      name: formValue.name!,
      url: formValue.url!,
      language_id: formValue.language_id!,
      language_version_id: formValue.language_version_id!,
    };

    this.projectsFacade.createProject(dto)
      .subscribe(() => {
        console.log('Project created');
      });
  }

  inspectProject() {
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.secondFormGroup.value;

    const dto = {
      branch: formValue.branch,
      project_id: 3,
      rule_group_id: formValue.rule_group_id,
      notification_info: {
        firebase_token: ''
      }
    }

    this._inspectionsFacade.createInspection(dto)
      .subscribe(() => {
        console.log('Inspection created');
      });
  }
}
