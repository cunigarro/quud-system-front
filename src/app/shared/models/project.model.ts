export interface CreateProjectResponse {
  message: string;
  data: Project
}

interface ProjectBase {
  name: string;
  url: string;
  language_version_id: number;
}

export interface Project extends ProjectBase {
  id: number;
  created_at: Date;
  updated_at: Date;
  language_id: number;
}

export interface CreateProjectDto extends ProjectBase {
  language_id: number;
}
