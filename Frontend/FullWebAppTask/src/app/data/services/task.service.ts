import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/TaskModel';
import { environment } from '../../../environments/environment';
import { AppService } from '../../core/services/app.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends AppService {
  protected apiUrl = environment.apiUrl;

  constructor(protected override http: HttpClient) {
    super(http);
  }
  getTask(): Observable<any> {
    return this.getAll('task');
  }

  addTask(task: Task): Observable<any> {
    return this.add('task', task);
  }

  updateTask(task: Task): Observable<any> {
    return this.update('task', task);
  }

  deleteTask(task: Task): Observable<any> {
    return this.delete('task', task.taskId);
  }

  deleteAllTasks(): Observable<any> {
    return this.deleteAll('task');
  }
}
