import { ApiResponse } from "./api.model";

export type RuleResponse = ApiResponse<{ rules: Rule[] }>;

export type RulesGroupResponse = ApiResponse<{ groups: RulesGroup[] }>;

export type CretateRulesGroupResponse = ApiResponse<{ group: RulesGroup }>;

export interface RulesGroup {
  id: number;
  name: string;
  description: string;
  group_rules: Rule[];
}

export interface Rule {
  id: number;
  name: string;
  rule_type: RuleType
}

export interface RuleType {
  id: number;
  name: string;
  dimension: string;
}

export interface GroupedRules {
  [dimension: string]: {
    [ruleType: string]: Rule[];
  };
}

export interface RuleWeight {
  rule_type_id: number;
  quantity: number;
}

export interface CreateRulesGroupBody {
  name: string;
  description: string;
  rule_ids: number[];
  alfa: number;
  attributes_weights: RuleWeight[];
  paradigm_weights: RuleWeight[];
}

