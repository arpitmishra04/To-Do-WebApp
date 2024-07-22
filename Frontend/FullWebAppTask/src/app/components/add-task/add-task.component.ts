import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../data/services/task.service';
import { Task } from '../../data/Models/TaskModel';
import { ToastService } from '../../data/services/toast.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';
  isDeleted: boolean = false;
  isCompleted: boolean = false;

  @Input() task: Task = {
    taskName: '',
    taskDescription: '',
    isDeleted: false,
    isCompleted: false,
  };
  @Input() isOpen = false;
  @Input() isUpdate: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  ngOnChanges() {
    this.title = this.task.taskName;
    this.description = this.task.taskDescription;
  }
  addTask() {
    this.taskService
      .addTask({
        taskName: this.title,
        taskDescription: this.description,
        isDeleted: this.isDeleted,
        isCompleted: this.isCompleted,
      })
      .subscribe({
        next: (response) => {
          console.log('Task added successfully', response);
          this.toastService.addToast({
            type: 'success',
            message: 'Task added successfully',
          });
          this.closeModal();
        },
        error: (error) => {
          console.error('Error adding task', error);
          this.toastService.addToast({
            type: 'error',
            message: 'Error adding task',
          });
        },
      });
  }

  closeModal() {
    this.close.emit();
  }
  updateTask() {
    let updatedTask: Task = {
      taskId: this.task.taskId,
      taskName: this.title,
      taskDescription: this.description,
      isCompleted: this.task.isCompleted,
      isDeleted: this.task.isCompleted,
    };
    if (updatedTask.taskId)
      this.taskService.updateTask(updatedTask).subscribe({
        next: () => {
          this.toastService.addToast({
            type: 'success',
            message: 'Task Updated successfully',
          });
          this.closeModal();
        },
        error: () => {
          this.toastService.addToast({
            type: 'error',
            message: 'Error updating the task.',
          });
        },
      });
  }

  handleSubmission() {
    debugger;
    if (this.isUpdate) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }
}
