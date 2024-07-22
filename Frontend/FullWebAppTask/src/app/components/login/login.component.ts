import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../data/services/user.service';
import { ToastService } from '../../data/services/toast.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  src: string = 'eye-visible';

  username = '';
  password = '';
  isDeleted = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  toggleActive() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.src = this.isPasswordVisible ? 'eye-hide-line' : 'eye-visible';
  }
  login() {
    console.log('clicked');
    this.userService
      .loginUser({
        userName: this.username,
        password: this.password,
        isDeleted: false,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.toastService.addToast({
            type: 'success',
            message: 'Login successful!',
          });
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
          this.toastService.addToast({
            type: 'error',
            message: 'Login failed. Please try again.',
          });
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
  }
}
