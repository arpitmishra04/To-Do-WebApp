import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AddTaskComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isModalOpen = false;
  title: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('dashboard')) {
        this.title = 'Dashboard';
      } else if (this.router.url.includes('active')) {
        this.title = 'Active';
      } else this.title = 'Completed';
    });
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  logout(): void {
    console.log('clicked');
    localStorage.removeItem('token');
  }
}
