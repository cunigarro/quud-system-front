import { Inspection } from "./inspection.model";
import { Project } from "./project.model";

export interface Evaluation extends Project, Inspection {}
