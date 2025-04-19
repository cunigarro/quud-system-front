import { ApiResponse } from "./api.model";

export type RuleResponse = ApiResponse<{ rules: Rule[] }>;

export type RulesGroupResponse = ApiResponse<{ groups: RulesGroup[] }>;

export type CretateRulesGroupResponse = ApiResponse<{ group: RulesGroup }>;

export interface CreateRulesGroupBody {
  name: string;
  description: string;
  rule_ids: [][];
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


