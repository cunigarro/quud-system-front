import { ApiResponse } from "./api.model";

export type LanguageResponse = ApiResponse<{ languages: Language[] }>;

export interface Language {
  name: string;
  id: number;
  uuid: string;
  versions: LanguageVersion[];
}

export interface LanguageVersion {
  version: string;
  id: number;
}
