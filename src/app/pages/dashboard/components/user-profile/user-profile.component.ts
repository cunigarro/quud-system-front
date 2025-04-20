import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Profile } from '../../../../shared/models/profile.model';
import { JsonPipe } from '@angular/common';
import { ProfileFacade } from '../../../../shared/facades/profile.facade';

@Component({
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    JsonPipe
  ],
})
export class UserProfileComponent {
  readonly dialogRef = inject(MatDialogRef<UserProfileComponent>);
  readonly data = inject<Profile>(MAT_DIALOG_DATA);
  private _fb = inject(FormBuilder);
  private _profileFacade = inject(ProfileFacade);
  profileMetadataForm!: FormGroup;
  showEditForm = false;

  ngOnInit(): void {
    this.profileMetadataForm =  this._fb.group({
      profile_photo: ['', Validators.required],
      name_profile: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      status_description: ['', Validators.required]
    });
  }

  toggleEdit(): void {
    this.showEditForm = !this.showEditForm;
  }

  saveProfileMetadata(): void {
    if (this.profileMetadataForm.invalid) {
      this.profileMetadataForm.markAllAsTouched();
      return;
    }

    this._profileFacade.saveProfile(this.profileMetadataForm.value)
      .subscribe(() => {
        this.toggleEdit();
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
