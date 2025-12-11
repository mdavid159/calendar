import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginResponseModel } from '../models/LoginResponse.model';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-scheduling',
  imports: [RouterOutlet],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss'
})
export class SchedulingComponent {
  clientInfo!: LoginResponseModel["user"];
  fakeClientInfo: LoginResponseModel["user"] = {
    id: "43",
    email: "matasuge@gmail.com",
    birthDate: new Date("2025-11-11 22:00:00"),
    name: "Muntean",
    surname: "David",
  };

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.clientInfo = this.fakeClientInfo; // CHANGE TO CLIENTINFO!!!
  }

  eventId: string = uuidv4();

  openEditor() {
    this.router.navigate(
      [
        {
          outlets: {
            sidebar: ['edit', this.eventId],
          }
        }
      ], { relativeTo: this.route } 
    );
  }
}
