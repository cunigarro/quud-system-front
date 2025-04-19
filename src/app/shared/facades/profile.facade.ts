import { computed, inject, Injectable, signal } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  private _profileService = inject(ProfileService);

  private _userInfo = signal<Profile | null>(null);

  readonly userInfo = computed(() => this._userInfo());

  loadUserInfo() {
    if (!this._userInfo()) {
      this._profileService.userInfo().subscribe({
        next: (data) => this._userInfo.set(data),
        error: (err) => console.error('Error loading user info', err),
      });
    }
  }
}
