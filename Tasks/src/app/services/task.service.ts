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
    return this.task = this.db.object('/tasks/' + id);
    // this.task.subscribe(item => {
    //     this.task = item
        
    //   });
  }

  // getTaskTest() {
  //   return this.db.list('/tasks').map( (items) => {
  //     return items.map( item => {
  //         item.comments = this.db.object(`/comments/${item.comment}`)
  //         return item
  //     })
  // })
  
  // }

  updateTask(id, newValue: string): void {
    this.db.object('/tasks/' + id)
      .update({ content: newValue });    
  }

  deleteTask(id: string){
    console.log(id);
    this.db.object('/tasks/' + id).remove();
  }

  addTask(task){
    this.db.list('/tasks').push(task);
  }
}
