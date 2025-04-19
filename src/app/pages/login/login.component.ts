import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '../../shared/facades/auth.facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { FormErrorStateMatcher } from '../../shared/utils/form-error-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SHARED_IMPORTS,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  matcher = new FormErrorStateMatcher();
  isLoading = false;
  showAlert = false;
  showPassword = false;
  mdiEye = mdiEye;
  mdiEyeOff = mdiEyeOff;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authFacade.loginUser(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.showAlert = true;
        this.isLoading = false;
      },
    });
  }
}
