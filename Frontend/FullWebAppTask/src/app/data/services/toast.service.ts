import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  addToast(toast: ToastMessage) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    setTimeout(() => {
      this.removeToast(toast);
    }, 1000);
  }

  private removeToast(toast: ToastMessage) {
    const currentToasts = this.toastsSubject.value.filter((t) => t !== toast);
    this.toastsSubject.next(currentToasts);
  }
}
