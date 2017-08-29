import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  private task: FirebaseObjectObservable<any>;
  constructor(public db: AngularFireDatabase) {}

  getTask(size): FirebaseListObservable<any[]> {
    return this.db.list('/tasks', {
      query: {
        orderByChild: 'createdOn',
        limitToFirst: size
      }
    });
  }

  getTaskById(id: string) {
    return this.task = this.db.object('/tasks/'+id);
    // this.task.subscribe(item => {
    //     this.task = item
        
    //   });
  }

  updateTask(task: any, newValue: string): void {
    this.db.object('/tasks/' + task.$key)
      .update({ content: newValue, done: task.done });    
  }

  deleteTask(key: string){
    console.log(key);
    this.db.object('/tasks/'+ key).remove();
  }

  addTask(task){
    this.db.list('/tasks').push(task);
  }
}
