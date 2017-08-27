import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(public db: AngularFireDatabase) {

  }

  getTask(size): FirebaseListObservable<any[]> {
    console.log(size);
    return this.db.list('/tasks', {
      query: {
        limitToFirst: size
      }
    });
  }

  
}
