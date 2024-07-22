import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../components/main/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
