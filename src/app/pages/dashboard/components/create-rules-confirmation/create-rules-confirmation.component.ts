import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RulesGroup } from '../../../../shared/models/rule.model';
import { JsonPipe } from '@angular/common';

@Component({
  templateUrl: './create-rules-confirmation.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    JsonPipe
  ],
})
export class CreateRulesConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<CreateRulesConfirmationComponent>);
  readonly data = inject<RulesGroup>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
