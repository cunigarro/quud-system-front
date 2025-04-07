import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-footer',
  templateUrl: './footer.component.html',
  standalone: true
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }
}
