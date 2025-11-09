import { Component } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {LoginResponseModel} from '../models/LoginResponse.model';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  clientInfo!: LoginResponseModel["user"];

  constructor(private loginService: LoginService, private router: Router) {
    this.clientInfo = this.loginService.clientInfo;
  }

}
