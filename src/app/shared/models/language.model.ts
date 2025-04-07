export interface LanguageResponse {
  message: string;
  data: Language[];
  errors: any;
}

export interface Language {
  name: string;
  uuid: string;
  versions: LanguageVersion[];
}

export interface LanguageVersion {
  version: string;
  id: number;
}
