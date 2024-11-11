import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(evt: Event) {
    evt.preventDefault();
    this.router.navigate(['/admin']);
  }
}
