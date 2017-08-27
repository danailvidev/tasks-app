import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { RequirementsComponent } from './requirements/requirements.component';

const routes: Routes = [
  { path: 'requirements', component: RequirementsComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  { path: '', component: RequirementsComponent },
  { path: '**', component: RequirementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

