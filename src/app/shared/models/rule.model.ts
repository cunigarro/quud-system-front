import { ApiResponse } from "./api.model";

export type RuleResponse = ApiResponse<{ rules: Rule[] }>;

export type RulesGroupResponse = ApiResponse<{ groups: RulesGroup[] }>;

export interface RulesGroup {
  id: number;
  name: string;
  description: string;
}

export interface Rule {
  id: number;
  name: string;
}


