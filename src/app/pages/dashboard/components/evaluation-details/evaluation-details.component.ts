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
import { JsonPipe } from '@angular/common';
import { Evaluation } from '../../../../shared/models/evaluation.model';

@Component({
  templateUrl: './evaluation-details.component.html',
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
export class EvaluationDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<EvaluationDetailsComponent>);
  readonly data = inject<Evaluation>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
