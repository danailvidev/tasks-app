import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Settings
import { environment } from '../environments/environment';

// Modules
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes-module';
import { CdkTableModule } from '@angular/cdk';

//Service
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { NotifyService } from './services/notify.service';
import {  UserService } from './services/user.service';

// Components
import { LoginComponent } from './ui/login/login.component';
import { TaskListComponent } from './ui/task-list/task-list.component';
import { RequirementsComponent } from './ui/requirements/requirements.component';
import { UsersComponent } from './ui/users/users.component';
import { HeaderComponent } from './ui/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    RequirementsComponent,
    UsersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    CdkTableModule
  ],
  providers: [
    AuthService,
    TaskService,
    NotifyService,
    UserService
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
