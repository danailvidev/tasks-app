import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Injectable()
export class TasksService {

    constructor(public db: AngularFireDatabase) {
        
      }

    get(): FirebaseListObservable<any[]> {
        return this.db.list('/tasks');
      }
}
