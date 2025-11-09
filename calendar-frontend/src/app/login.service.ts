import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponseModel} from './models/LoginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000';
  public clientInfo!: LoginResponseModel['user'];

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login-page/login`, { email, password });
  }

  OauthLogin(OAuthToken: string): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login-page/google`, { OAuthToken });
  }
}
