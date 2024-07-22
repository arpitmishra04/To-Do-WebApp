import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/UserModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppService } from '../../core/services/app.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AppService {
  protected apiUrl = environment.apiUrl;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  loginUser(user: User): Observable<any> {
    return this.add('user/login', {
      username: user.userName,
      password: user.password,
      isDeleted: (user.isDeleted = false),
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  SignUpUser(user: User): Observable<any> {
    return this.add('user/register', {
      username: user.userName,
      password: user.password,
      isDeleted: (user.isDeleted = false),
    });
  }
}
