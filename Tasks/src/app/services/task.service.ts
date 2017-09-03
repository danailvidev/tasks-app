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
    return  this.db.object(`/tasks/${id}`);
  }

  updateTask(id, newValue): void {
    this.db.object(`/tasks/${id}`)
      .update(newValue);
  }

  deleteTask(id: string) {
    this.db.object(`/tasks/${id}`).remove();
  }

  addTask(task) {
    this.db.list('/tasks').push(task);
  }
}
