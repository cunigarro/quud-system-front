import { Component, inject, OnInit, signal, Signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, JsonPipe, Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LanguageFacade } from '../../../../shared/facades/language.facade';
import { Language, LanguageVersion } from '../../../../shared/models/language.model';
import { ProjectsFacade } from '../../../../shared/facades/projects.facade';
import { CreateProject } from '../../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { InspectionsFacade } from '../../../../shared/facades/inspections.facade';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CreateInspectionBody } from '../../../../shared/models/inspection.model';
import { RulesGroup } from '../../../../shared/models/rule.model';

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
  private _location = inject(Location);

  isLinear = false;
  languages!: Signal<Language[] | null>;
  rulesGroups!: Signal<RulesGroup[] | null>;
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

  projectId!: string | null;

  @ViewChild('stepper') stepper!: MatStepper;

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

    this.projectId = this._route.snapshot.paramMap.get('projectId');

    if(this.projectId) {
      this.projectsFacade.project(Number(this.projectId)).subscribe(project => {
        this.firstFormGroup.get('language_version_id')?.enable();
        setTimeout(() => {
          this.firstFormGroup.setValue({
            name: project.name,
            url: project.url,
            language_id: project.language_id,
            language_version_id: project.language_version_id
          });
          this.stepper.selectedIndex = 1;
        });
      });
    }
  }

  registerProject() {
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.firstFormGroup.value;

    const body: CreateProject = {
      name: formValue.name!,
      url: formValue.url!,
      language_id: formValue.language_id!,
      language_version_id: formValue.language_version_id!,
    };

    this.projectsFacade.createProject(body)
      .subscribe((res: any) => {
        this.projectId = res.data.id;
        const currentPath = this._location.path();
        this._location.replaceState(`${currentPath}/${this.projectId}`);
      });
  }

  inspectProject() {
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      return;
    }

    const formValue = this.secondFormGroup.value;

    const body: CreateInspectionBody = {
      branch: formValue.branch!,
      project_id: Number(this.projectId!),
      rule_group_id: Number(formValue.rule_group_id!),
      notification_info: {
        firebase_token: ''
      }
    }

    this._inspectionsFacade.createInspection(body)
      .subscribe(() => {
        console.log('Inspection created');
      });
  }

  onStepChange(event: StepperSelectionEvent) {
    const previousIndex = event.previouslySelectedIndex;
    const prevStep = this.stepper.steps.get(previousIndex);
    if (prevStep) {
      prevStep.editable = false;
    }
  }
}
