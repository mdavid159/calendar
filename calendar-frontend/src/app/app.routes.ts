import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {jwtAuthGuard} from './jwt-auth.guard';
import {NoPageComponent} from './no-page/no-page.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {CreateMeetingComponent} from './create-meeting/create-meeting.component';
import {SeeMeetingsComponent} from './see-meetings/see-meetings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [jwtAuthGuard] },
  { path: 'settings', component: UserSettingsComponent, canActivate: [jwtAuthGuard] },
  { path: 'create-meeting', component: CreateMeetingComponent, canActivate: [jwtAuthGuard] },
  { path: 'meetings', component: SeeMeetingsComponent, canActivate: [jwtAuthGuard] },
  { path: '**', component: NoPageComponent },
];
