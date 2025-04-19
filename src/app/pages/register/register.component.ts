import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../shared/facades/auth.facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { FormErrorStateMatcher } from '../../shared/utils/form-error-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SHARED_IMPORTS
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  matcher = new FormErrorStateMatcher();
  isLoading = false;
  showPassword = false;
  mdiEye = mdiEye;
  mdiEyeOff = mdiEyeOff;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authFacade.registerUser(this.registerForm.value)
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin']);
      });
  }
}
