import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../data/services/task.service';
import { Task } from '../../data/Models/TaskModel';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TimeAgoPipe } from '../../core/pipes/timeAgoPipe';
import { Subscription } from 'rxjs';
import { ToastService } from '../../data/services/toast.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    AddTaskComponent,
    TimeAgoPipe,
    DeleteConfirmationDialogComponent,
  ],
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  currentDate: Date = new Date();
  todotasks: any[] = [];
  subscription!: Subscription;
  isModalOpen = false;
  taskToDelete: any;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  showDialog = false;

  openDialog(task: Task) {
    this.showDialog = true;
    this.taskToDelete = task;
  }

  editTask: Task = {
    taskName: '',
    taskDescription: '',
    isCompleted: false,
    isDeleted: false,
  };

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
          (task) => task.isCompleted == false
        );
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Fetching The Tasks.',
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
          message: 'Task has been Completed!',
        });
      },
      error: () => {
        this.toastService.addToast({
          type: 'error',
          message: 'Error Updating the Status of the task!',
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
          message: 'Error deleting the task!',
        });
      },
    });
  }
  edit(task: Task) {
    this.editTask = task;
    this.getTask();
  }
}
