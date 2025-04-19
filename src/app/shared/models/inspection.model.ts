import { ApiResponse } from "./api.model";
import { Project } from "./project.model";
import { RulesGroup } from "./rule.model";

export type CreateInspectionResponse = ApiResponse<{ inspection: Inspection }>;

export type InspectionsResponse = ApiResponse<{ inspections: Inspection[] }>;

export interface Inspection {
  id: number;
  branch: string;
  project: Project;
  rule_group: RulesGroup;
}
export interface CreateInspectionBody {
  branch: string;
  project_id: number;
  rule_group_id: number;
  notification_info: NotifyInspection;
}
export interface NotifyInspection {
  firebase_token: string;
}
