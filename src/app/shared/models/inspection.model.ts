import { ApiResponse } from "./api.model";

export interface Inspection {
  id: number;
  branch: string;
  project_id: number;
  rule_group_id: number;
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

export type CreateInspectionResponse = ApiResponse<{ inspection: Inspection }>;
export type InspectionsResponse = ApiResponse<{ inspections: Inspection[] }>;
