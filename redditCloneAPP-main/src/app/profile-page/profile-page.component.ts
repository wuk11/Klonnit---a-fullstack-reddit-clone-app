import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  changePassForm: FormGroup;
  changeDescForm: FormGroup;
  changeDisplayNameForm: FormGroup;
  changeImageForm: FormGroup;

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.changePassForm = this.fb.group({
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
    this.changeDescForm = this.fb.group({
      description: [''],
    });
    this.changeDisplayNameForm = this.fb.group({
      displayName: [''],
    });
    this.changeImageForm = this.fb.group({
      image: [''],
    });
  }

  userData: any = {};
  isFormVisible: boolean = false;
  isDescFormVisible: boolean = false;
  isDisplayNameFormVisible: boolean = false;
  isImageFormVisible: boolean = false;
  karma: number = 0;

  ngOnInit() {
    this.backend.getMe().subscribe((res: any) => {
      this.userData = res.user;
      this.backend.getUserKarma(res.user.id).subscribe((res: any) => {
        this.karma = res.totalKarma;
      });
    });
  }

  onPassFormSubmit(event: any) {
    event.preventDefault();
    const { password, newPassword, confirmPassword } =
      this.changePassForm.value;
    if (newPassword === confirmPassword) {
      this.backend.postChangePassword(password, newPassword).subscribe({
        next: (res: any) => {
          this.auth.logout();
          alert('Password changed successfully, please log back in.');
        },
        error: (err: any) => {
          alert(err.error.message);
        },
      });
    } else {
      alert('Passwords do not match.');
    }
  }

  onDescFormSubmit(event: any) {
    event.preventDefault();
    const { description } = this.changeDescForm.value;
    this.backend.postChangeDescription(description).subscribe({
      next: (res: any) => {
        this.backend.getMe().subscribe((res: any) => {
          this.userData = res.user;
        });
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }

  onDisplayNameFormSubmit(event: any) {
    event.preventDefault();
    const { displayName } = this.changeDisplayNameForm.value;
    this.backend.postChangeDisplayName(displayName).subscribe({
      next: (res: any) => {
        this.backend.getMe().subscribe((res: any) => {
          this.userData = res.user;
        });
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }

  onImageFormSubmit(event: any) {
    event.preventDefault();
    const { image } = this.changeImageForm.value;
    this.backend.postChangeImage(image).subscribe({
      next: (res: any) => {
        this.backend.getMe().subscribe((res: any) => {
          this.userData = res.user;
        });
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }

  showChangePassForm() {
    this.isFormVisible = !this.isFormVisible!;
  }

  showChangeDescForm() {
    this.isDescFormVisible = !this.isDescFormVisible;
  }

  showChangeDisplayNameForm() {
    this.isDisplayNameFormVisible = !this.isDisplayNameFormVisible;
  }

  showChangeImageForm() {
    this.isImageFormVisible = !this.isImageFormVisible;
  }
}
