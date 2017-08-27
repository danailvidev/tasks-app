import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(public db: AngularFireDatabase) {}

  getUsers(): FirebaseListObservable<any[]> {
    return this.db.list('/users');
    
  }
}
