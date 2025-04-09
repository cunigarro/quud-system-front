import { Component, Input, OnInit } from '@angular/core';
import { mdiAlertCircleOutline, mdiClose } from '@mdi/js';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  imports: [
    IconComponent
  ],
  standalone: true
})
export class AlertComponent implements OnInit {
  mdiAlertCircleOutline = mdiAlertCircleOutline;
  mdiClose = mdiClose;
  @Input() showAlert = true;

  constructor() { }

  ngOnInit(): void { }

  closeAlert() {
    this.showAlert = false;
  }
}
