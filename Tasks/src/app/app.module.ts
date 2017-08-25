import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import {MdMenuModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Shared/Widget
import { SharedModule } from './shared/shared.module';

import { AuthService } from './shared/auth.service';
import { TasksService } from './shared/tasks.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule, 
    MdMenuModule,
    NoopAnimationsModule,
    SharedModule
  ],
  providers: [AuthService,TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
