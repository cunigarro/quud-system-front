export interface InspectionResponse {
}

export interface Inspection {
  id: number;
  branch: string;
  project_id: number;
  rule_group_id: number;
}

export interface CreateInspectionDto {
  branch: string;
  project_id: number;
  rule_group_id: number;
  notification_info: NotifyInspection;
}

export interface NotifyInspection {
  firebase_token: string;
}
