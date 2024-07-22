import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map, tap } from 'rxjs';
import { ApiResponse } from '../../data/Models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export abstract class AppService {
  protected abstract apiUrl: string;

  private dataChangeSubject: Subject<void> = new Subject<void>();
  dataChanged$: Observable<void> = this.dataChangeSubject.asObservable();

  constructor(protected http: HttpClient) {}

  getAll(endpoint: string): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${endpoint}`).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.errors.join(', '));
        }
      })
    );
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http
      .get<ApiResponse<any>>(`${this.apiUrl}/${endpoint}/${id}`)
      .pipe(
        map((response) => {
          if (response.success) {
            return response.data;
          } else {
            throw new Error(response.errors.join(', '));
          }
        })
      );
  }

  add(endpoint: string, item: any): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/${endpoint}`, item)
      .pipe(
        tap(() => this.dataChangeSubject.next()),
        map((response) => {
          if (response.success) {
            return response.data;
          } else {
            throw new Error(response.errors.join(', '));
          }
        })
      );
  }

  update(endpoint: string, item: any): Observable<any> {
    return this.http
      .put<ApiResponse<any>>(`${this.apiUrl}/${endpoint}`, item)
      .pipe(
        tap(() => this.dataChangeSubject.next()),
        map((response) => {
          if (response.success) {
            return response.data;
          } else {
            throw new Error(response.errors.join(', '));
          }
        })
      );
  }

  delete(endpoint: string, id: number | undefined): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.apiUrl}/${endpoint}/${id}`)
      .pipe(
        tap(() => this.dataChangeSubject.next()),
        map((response) => {
          if (response.success) {
            return;
          } else {
            throw new Error(response.errors.join(', '));
          }
        })
      );
  }

  deleteAll(endpoint: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.apiUrl}/${endpoint}/all`)
      .pipe(
        tap(() => this.dataChangeSubject.next()),
        map((response) => {
          if (response.success) {
            return;
          } else {
            throw new Error(response.errors.join(', '));
          }
        })
      );
  }
}
