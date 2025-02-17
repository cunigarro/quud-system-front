import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface EvaluationRecord {
  projectName: string;
  repositoryName: string;
  evaluationDate: string;
  score: number;
  language: string;
  criteria: string;
}

const ELEMENT_DATA: EvaluationRecord[] = [
  {
    projectName: 'Proyecto 1',
    repositoryName: 'Repo 1',
    evaluationDate: '2024-03-11',
    score: 80,
    language: 'Java',
    criteria: 'Maintainability',
  },
  {
    projectName: 'Proyecto 2',
    repositoryName: 'Repo 2',
    evaluationDate: '2024-03-12',
    score: 90,
    language: 'Python',
    criteria: 'Security',
  },
  // ... agrega más registros si lo deseas
];

@Component({
  templateUrl: './evaluation-history.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class EvaluateHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'projectName',
    'repositoryName',
    'evaluationDate',
    'score',
    'language',
    'criteria',
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
