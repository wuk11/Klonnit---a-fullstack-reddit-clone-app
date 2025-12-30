import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      confirmPassword: [''],
      email: [''],
    });
  }

  onFormSubmit() {
    const { username, password, confirmPassword, email } = this.registerForm.value;
    console.log(password);
    this.backend.postRegister(username, password, confirmPassword, email).subscribe({
      next: (res: any) => {
        this.router.navigate(['']);
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
