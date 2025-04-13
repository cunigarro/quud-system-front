import { Injectable, signal, computed, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Language } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class LanguageFacade {
  private languageService = inject(LanguageService);

  private _languages = signal<Language[] | null>(null);

  readonly languages = computed(() => this._languages());

  loadLanguages() {
    if (!this._languages()) {
      this.languageService.language().subscribe({
        next: (langs) => {
          const data = langs.data.map((l,i) => {
            return {
              ...l,
              id: i + 1
            }
          })
          this._languages.set(data)
        },
        error: (err) => console.error('Error loading languages', err),
      });
    }
  }
}
