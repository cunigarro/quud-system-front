export interface CreateProjectResponse {
  message: string;
  data: Project;
  errors: string;
}

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

export interface CreateProject extends ProjectBase {}
