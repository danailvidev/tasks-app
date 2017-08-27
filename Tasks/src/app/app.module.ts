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

// Shared/Widget
import { SharedModule } from './shared/shared.module';

//Service
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { NotifyService } from './services/notify.service';


import { AppRoutingModule } from './app.routes-module';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { RequirementsComponent } from './requirements/requirements.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    RequirementsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TaskService,
    NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
