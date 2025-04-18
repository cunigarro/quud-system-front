export interface CreateInspectionResponse {
  message: string;
  errors: string;
  data: {
    inspection: Inspection
  }
}

export interface InspectionsResponse {
  message: string;
  errors: string;
  data: {
    inspections: Inspection[]
  }
}

export interface Inspection {
  id: number;
  branch: string;
  project_id: number;
  rule_group_id: number;
}

export interface CreateInspection {
  branch: string;
  project_id: number;
  rule_group_id: number;
  notification_info: NotifyInspection;
}

export interface NotifyInspection {
  firebase_token: string;
}
