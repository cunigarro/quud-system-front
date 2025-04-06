import { Component, inject, model, signal } from '@angular/core';
import { mdiMenuDown } from '@mdi/js';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AuthFacade } from '../../../../shared/facades/auth.facade';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [SHARED_IMPORTS, RouterModule, MatMenuModule, RouterModule],
})
export class HeaderComponent {
  mdiMenuDown: string = mdiMenuDown;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ){}

  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  logoutUser(): void {
    this.authFacade.logoutUser()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
