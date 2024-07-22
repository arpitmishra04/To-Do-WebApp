import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../data/services/task.service';
import { Task } from '../../data/Models/TaskModel';
import { TimeAgoPipe } from '../../core/pipes/timeAgoPipe';
import { Subscription } from 'rxjs';
import { ToastService } from '../../data/services/toast.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    TimeAgoPipe,
    DeleteConfirmationDialogComponent,
  ],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss',
})
export class CompletedComponent {
  currentDate: Date = new Date();
  todotasks: any[] = [];
  subscription!: Subscription;

  showDialog = false;

  taskToDelete: any;
  openDialog(task: Task) {
    this.showDialog = true;
    this.taskToDelete = task;
  }

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

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
        this.todotasks = this.todotasks.filter(
          (task) => task.isCompleted == true
        );
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Fetching the Tasks.',
        });
      },
    });
  }

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
  toggleActive(task: any) {
    task.isCompleted = !task.isCompleted;
    this.getSrc(task.isCompleted);
    this.getClass(task.isCompleted);
    this.updateTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.getTask();
        this.toastService.addToast({
          type: 'success',
          message: 'Tasks is Active!',
        });
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error updating task status!',
        });
      },
    });
  }

  handleConfirmDelete(confirmed: boolean) {
    this.showDialog = false;
    if (confirmed) {
      this.deleteTask(this.taskToDelete);
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.getTask();
        this.toastService.addToast({
          type: 'success',
          message: 'Task deleted Successfully!',
        });
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Deleting the task!',
        });
      },
    });
  }
}
