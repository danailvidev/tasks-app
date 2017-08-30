import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {
  private comment: FirebaseObjectObservable<any>;
  constructor(public db: AngularFireDatabase) {}

  getComment(size): FirebaseListObservable<any[]> {
    return this.db.list('/tasks/comments', {
      query: {
        orderByChild: 'createdOn',
        limitToFirst: size
      }
    });
  }

  getCommentByTaskId(id: string) {
    return this.comment = this.db.object('/tasks/comments/' + id);
  }

  addComment(comment, taskId){
    this.db.list('/tasks/' + taskId + '/comments').push(comment);
  }
}
