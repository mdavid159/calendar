import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginSchema } from '../schemas/login-schema';
import { LoginService } from '../login.service';
import { jwtDecode } from 'jwt-decode';
import {LoginResponseModel} from '../models/LoginResponse.model';

declare const google: any;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  email = '';
  password = '';

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '731785377983-m14pq0tilvl97p8a4ugdqec9tfkg49hn.apps.googleusercontent.com',
      callback: this.handleCredentialResponseSuccess.bind(this),
      error_callback: this.handleCredentialResponseFailure.bind(this),
    });

    google.accounts.id.renderButton(document.getElementById('googleBtn'), {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponseSuccess(response: any) {
    console.log('Encoded JWT ID token: ', response.credential);
    this.loginService.OauthLogin(response.credential).subscribe({
      next: (response: LoginResponseModel) => {
        console.log('Login success: ',response);
        sessionStorage.setItem('access_token', response.access_token); // CHANGE TO LOCALSTORAGE
        this.loginService.clientInfo = response.user;
        this.router.navigate(['/home/scheduling']);
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Account not found!');
        }
      }
    });
  }

  handleCredentialResponseFailure(response: any) {
    console.log('Credential response failure: ', response.error);
  }

  onSubmit() {
    const schemaResult = LoginSchema.safeParse({
      email: this.email,
      password: this.password,
    });

    if (!schemaResult.success) {
      alert(`Invalid email or password format`);
    } else {
      this.loginService.login(this.email, this.password).subscribe({
        next: (response : LoginResponseModel ) => {
          console.log('Login success:', response)
          sessionStorage.setItem('access_token', response.access_token); // CHANGE TO LOCALSTORAGE
          this.loginService.clientInfo = response.user;
          this.router.navigate(['/home/scheduling']);
        },
        error: (err) => {
          if (err.status === 401) {
            alert(`Wrong email or password`);
          } else if (err.status === 404) {
            alert(`Account Not Found`);
          } else {
            alert(err.message);
          }
        }
      });
    }
  }
}
