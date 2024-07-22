import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../../data/services/task.service';
import { Task } from '../../../../data/Models/TaskModel';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../data/services/toast.service';
import { DeleteConfirmationDialogComponent } from '../../../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-task-statistics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    DeleteConfirmationDialogComponent,
  ],
  templateUrl: './task-statistics.component.html',
  styleUrls: ['./task-statistics.component.scss'],
})
export class TaskStatisticsComponent implements OnInit {
  currentDate: Date = new Date();
  title: any;
  description: any;
  isCompleted: any;
  isDeleted: any;
  subscription!: Subscription;
  todotasks: any;

  showDialog = false;

  openDialog() {
    this.showDialog = true;
  }

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  getSrc(isCompleted: boolean) {
    if (isCompleted) {
      return 'assets/tasklist/task-complete-checkbox.svg';
    } else {
      return 'assets/tasklist/task-active-checkbox.svg';
    }
  }
  getClass(isCompleted: boolean) {
    if (isCompleted) {
      return 'completed';
    } else {
      return 'active';
    }
  }

  ngOnInit(): void {
    this.getTask();
    this.subscription = this.taskService.dataChanged$.subscribe(() => {
      this.getTask();
    });
  }
  getTask() {
    this.taskService.getTask().subscribe({
      next: (response: any) => {
        this.todotasks = response;
        this.calcPercentage();
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Fetching the task.',
        });
      },
    });
  }

  handleConfirmDelete(confirmed: boolean) {
    this.showDialog = false;
    if (confirmed) {
      this.deleteAll();
    }
  }
  deleteAll() {
    this.taskService.deleteAllTasks().subscribe({
      next: () => {
        this.toastService.addToast({
          type: 'success',
          message: 'Tasks Deleted Successfully!',
        });
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Deleting the tasks.',
        });
      },
    });
  }
  competedTasks: number = 0;
  activeTasks: number = 0;
  count: number = 0;

  toggleActive(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.getSrc(task.isCompleted);
    this.getClass(task.isCompleted);
    this.calcPercentage();
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.getTask();
        if (task.isCompleted) {
          this.toastService.addToast({
            type: 'success',
            message: 'Tasks has been completed!',
          });
        } else {
          this.toastService.addToast({
            type: 'success',
            message: 'Tasks is Active!',
          });
        }
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Adding the task!',
        });
      },
    });
  }

  calcPercentage() {
    if (this.todotasks.length == 0) {
      this.activeTasks = 0;
      this.competedTasks = 0;
    } else {
      this.count = 0;
      this.todotasks.forEach((element: any) => {
        if (!element.isCompleted) this.count++;
      });

      this.activeTasks = Math.floor((this.count / this.todotasks.length) * 100);
      this.competedTasks = Math.ceil(100 - this.activeTasks);
    }
  }
}
