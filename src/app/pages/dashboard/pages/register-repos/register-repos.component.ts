import { Component, inject, OnInit, Signal } from '@angular/core';
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
import { Language } from '../../../../shared/models/language.model';

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

  firstFormGroup = this._formBuilder.group({
    projectName: ['', Validators.required],
    urlRepository: ['', Validators.required],
    language: ['', Validators.required],
    languageVersion: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    branch: ['', Validators.required],
    qualityRulesGroup: ['', Validators.required],
  });

  constructor(
    private languageFacade: LanguageFacade
  ){}

  ngOnInit(): void {
    this.languageFacade.loadLanguages();
    this.languages = this.languageFacade.languages;
  }
}
