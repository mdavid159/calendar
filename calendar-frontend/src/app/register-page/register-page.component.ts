import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RegisterSchema} from '../schemas/register-schema';
import {RegisterService} from '../register.service';
import {Router} from '@angular/router';
import dayjs from "dayjs";
dayjs().format();

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  standalone: true,
})

export class RegisterPageComponent {
  constructor(private router: Router, private registerService: RegisterService) {}

  name: string = '';
  surname: string = '';
  birthDate: string = '';
  password: string = '';
  email: string = '';

  onSubmit() {
    const schemaResult = RegisterSchema.safeParse({
      email: this.email,
      name: this.name,
      surname: this.surname,
      birthDate: dayjs(this.birthDate).toDate(),
      password: this.password,
    });

    if (!schemaResult.success) {
      alert(`Invalid email address: ${schemaResult.error}`);
    } else {
      this.registerService.register(this.email, this.name, this.surname, dayjs(this.birthDate).toDate(), this.password).subscribe({
        next: () => {
          alert('Registration successful, please login');
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Register failed:', err),
        }
      );
    }
  }
}
