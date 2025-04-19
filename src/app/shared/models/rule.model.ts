import { ApiResponse } from "./api.model";

export type RuleResponse = ApiResponse<{ rules: Rule[] }>;

export interface RulesGroupResponse {
  message: string;
  errors: string;
  data: {
    groups: RulesGroup[];
  };
}

export interface RulesGroup {
  id: number;
  name: string;
  description: string;
}

export interface Rule {
  id: number;
  name: string;
}


