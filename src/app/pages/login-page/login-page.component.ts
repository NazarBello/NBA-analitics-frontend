import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [ReactiveFormsModule]
})
export class LoginPageComponent {

  private auth  = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.auth.login(this.form.getRawValue())
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: err => console.error('Login failed', err)
      });
  }
}
