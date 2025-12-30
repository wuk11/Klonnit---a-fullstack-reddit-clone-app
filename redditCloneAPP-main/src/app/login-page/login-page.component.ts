import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private backend: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  tokenData: any = '';
  username: string = '';
  password: string = '';

  onFormSubmit(event: any) {
    event.preventDefault();
    const { username, password } = this.loginForm.value;
    this.backend.postLogin(username, password).subscribe({
      next: (res) => {
        this.tokenData = res;
        this.auth.setSession(this.tokenData);
        this.router.navigate(['']);
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
