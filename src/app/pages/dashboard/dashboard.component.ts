import { Component, inject, OnInit, Signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RegisterReposComponent } from './pages/register-repos/register-repos.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileFacade } from '../../shared/facades/profile.facade';
import { Profile } from '../../shared/models/profile.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RouterModule,
    RegisterReposComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UserProfileComponent
  ]
})
export class DashboardComponent implements OnInit {
  private _profileFacade = inject(ProfileFacade);
  userInfo!: Signal<Profile | null>;

  ngOnInit(): void {
    this._profileFacade.loadUserInfo();
    this.userInfo = this._profileFacade.userInfo;
  }
}
