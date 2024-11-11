import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(evt: Event) {
    evt.preventDefault();
    this.router.navigate(['/admin']);
  }
}
