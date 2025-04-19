import { Component, inject, Input, input } from '@angular/core';
import { mdiMenuDown } from '@mdi/js';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthFacade } from '../../../../shared/facades/auth.facade';
import { JsonPipe } from '@angular/common';
import { Profile } from '../../../../shared/models/profile.model';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [SHARED_IMPORTS, RouterModule, MatMenuModule, RouterModule, JsonPipe],
})
export class HeaderComponent {
  mdiMenuDown: string = mdiMenuDown;
  @Input() userInfo!: Profile | null;
  readonly dialog = inject(MatDialog);

  constructor(private authFacade: AuthFacade, private router: Router) {}

  openDialog(): void {
    this.dialog.open(UserProfileComponent, {
      data: this.userInfo
    });
  }

  logoutUser(): void {
    this.authFacade.logoutUser().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
