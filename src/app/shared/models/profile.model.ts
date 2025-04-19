import { ApiResponse } from "./api.model";

export type ProfileResponse = ApiResponse<{ user: Profile }>;

export interface Profile {
  id: number;
  names: string;
  last_names: string;
  email: string;
  profile_metadata: any;
}

