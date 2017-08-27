import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(public db: AngularFireDatabase) {}

  getTask(size): FirebaseListObservable<any[]> {
    return this.db.list('/tasks', {
      query: {
        limitToFirst: size
      }
    });
  }

  addTask(value: string): void {
    this.db.list('/tasks').push({ content: value, done: false });
  }

  updateTask(task: any, newValue: string): void {
    this.db.object('/tasks/' + task.$key)
      .update({ content: newValue, done: task.done });    
  }

  deleteTask(key: string){
    console.log(key);
    this.db.object('/tasks/'+ key).remove();
  }

  
}
