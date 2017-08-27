import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './ui/login/login.component';
import { TaskListComponent } from './ui/task-list/task-list.component';
import { RequirementsComponent } from './ui/requirements/requirements.component';
import { UsersComponent } from "./ui/users/users.component";

const routes: Routes = [
  { path: 'requirements', component: RequirementsComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: '', component: RequirementsComponent },
  { path: '**', component: RequirementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

