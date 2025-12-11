import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {jwtAuthGuard} from './jwt-auth.guard';
import {NoPageComponent} from './no-page/no-page.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {SeeMeetingsComponent} from './see-meetings/see-meetings.component';
import {SchedulingComponent} from './scheduling/scheduling.component';
import { SchedulingEditorComponent } from './scheduling-editor/scheduling-editor.component';
import { SelectorMenuComponent } from './selector-menu/selector-menu.component';
import { AvaliabilityPageComponent } from './avaliability-page/avaliability-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { HelpPageComponent } from './help-page/help-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'settings', component: UserSettingsComponent, canActivate: [jwtAuthGuard] },
  { 
    path: 'home', component: SelectorMenuComponent, canActivate: [jwtAuthGuard],
    children: [
      { 
        path: 'scheduling', component: SchedulingComponent, canActivate: [jwtAuthGuard],
        children: [
          { path: 'edit/:id', component: SchedulingEditorComponent, outlet:'sidebar', canActivate: [jwtAuthGuard] },
        ]
      },
      {
        path: 'meetings', component: SeeMeetingsComponent, canActivate: [jwtAuthGuard]
      },
      {
        path: 'avaliability', component: AvaliabilityPageComponent, canActivate: [jwtAuthGuard]
      },
      {
        path: 'contacts', component: ContactsPageComponent, canActivate: [jwtAuthGuard]
      },
      {
        path: 'help', component: HelpPageComponent, canActivate: [jwtAuthGuard]
      }
    ],
  },
  { path: '**', component: NoPageComponent },
];
