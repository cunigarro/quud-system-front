import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
