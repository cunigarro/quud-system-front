import { computed, inject, Injectable, signal } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile, ProfileMetadata } from '../models/profile.model';
import { Observable, tap } from 'rxjs';

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

          this._loaded.set(true);
        },
        error: (err) => console.error('Error loading user info', err),
      });
    }
  }

  saveProfile(body: ProfileMetadata) {
    const current = this._userInfo();

    const profile: Profile = {
      id: current!.id,
      names: current!.names,
      last_names: current!.last_names,
      email: current!.email,
      profile_metadata: {
        ...current!.profile_metadata,
        ...body
      }
    };

    return this._profileService.saveProfile(profile).pipe(
      tap((data) => {
        this._userInfo.set(data);
      })
    );
  }

  reset() {
    this._userInfo.set({
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
    }); // TODO: Improve this way to reset the state
    this._loaded.set(false);
  }
}
