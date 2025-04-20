import { computed, inject, Injectable, signal } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  private _profileService = inject(ProfileService);

  private _loaded = signal(false);

  private _userInfo = signal<Profile | null>({
    names: '',
    last_names: '',
    email: '',
    id: 0,
    profile_metadata: {
      profile_photo: '',
      name_profile: '',
      city: '',
      country: '',
      status_description: ''
    }
  });

  readonly userInfo = computed(() => this._userInfo());

  loadUserInfo() {
    if (!this._loaded()) {
      this._profileService.userInfo().subscribe({
        next: (data) => {
          this._userInfo.set({
            ...this._userInfo(),
            ...data,
            profile_metadata: {
              ...this._userInfo()?.profile_metadata,
              ...data.profile_metadata
            }
          });

          console.log(this._userInfo());
          this._loaded.set(true);
        },
        error: (err) => console.error('Error loading user info', err),
      });
    }
  }
}
