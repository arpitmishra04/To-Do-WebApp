import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../data/services/user.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../data/services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isPasswordVisible: boolean = false;
  src: string = 'signup-eye-visible';
  username = '';
  password = '';
  isDeleted: Boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}
  toggleActive() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.src = this.isPasswordVisible
      ? 'signup-eye-hide-line'
      : 'signup-eye-visible';
  }
  signup() {
    if (this.username == '' || this.password == '') {
      this.toastService.addToast({
        type: 'error',
        message: 'Username or password cannot be null,please try again.',
      });
      return;
    }
    this.userService
      .SignUpUser({
        userName: this.username,
        password: this.password,
        isDeleted: false,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Signup request completed');
        },
      });
  }
}
