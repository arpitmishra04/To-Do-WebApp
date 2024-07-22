import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { TaskStatisticsComponent } from './task-statistics/task-statistics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeroComponent,TaskStatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
