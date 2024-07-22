export interface Task {
  taskId?: number;
  taskName: string;
  createdAt?: Date;
  taskDescription: string;
  isCompleted: boolean;
  isDeleted: boolean;
}
