import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AddTaskComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  dropdownOpen = false;

  links = [
    { label: 'Dashboard', url: 'dashboard' },
    { label: 'Active', url: 'active' },
    { label: 'Completed', url: 'completed' },
  ];
  activeLink = this.links[0];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setActiveLink(link: any) {
    this.activeLink = link;
    this.dropdownOpen = false;
  }

  get nonActiveLinks() {
    return this.links.filter((link) => link !== this.activeLink);
  }
}
