import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(email: string, name: string, surname: string, birthDate: string, password: string) {
    return this.http.post(`${this.apiUrl}/register-page/register`, {
      email,
      name,
      surname,
      birthDate,
      password
    });
  }

}
