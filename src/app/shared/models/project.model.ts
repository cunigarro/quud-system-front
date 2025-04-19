import { ApiResponse } from "./api.model";

export type CreateProjectResponse = ApiResponse<{ project: Project }>;

export type ProjectResponse = ApiResponse<{ project: Project }>;

export type ProjectsResponse = ApiResponse<{ projects: Project[] }>;

interface ProjectBase {
  name: string;
  url: string;
  language_version_id: number;
  language_id: number;
}

export interface Project extends ProjectBase {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectBody extends ProjectBase {}
