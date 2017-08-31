import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NotifyService } from '../../services/notify.service';
import { UserService } from '../../services/user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Task } from '../../view-models/task';
import { Router } from "@angular/router";
import { MdDialog, MdDialogRef } from '@angular/material';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any;
  allTasksVisible: boolean;
users: any;

  constructor(private taskSvc: TaskService,
    public notifySvc: NotifyService,
    private router: Router,
    private dialog: MdDialog,
    private userSvc: UserService,
    private commentSvc: CommentService) {
  }

  ngOnInit() {
    
    this.taskSvc.getTask(null)
    .subscribe((res) => {
      this.length = res.length
      this.tasks = res
    })
  }

  // MdPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MdPaginator Output
  onPaginateChange($event) {
    this.pageSize = $event.pageSize;
    this.getTask(this.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  getTask(pageSize) {
    this.taskSvc.getTask(this.pageSize).subscribe((res) => {
      this.tasks = res;
    });
  }

  deleteTask(taskKey) {
    this.taskSvc.deleteTask(taskKey);
  }

  showTaskDetail(id: string) {
    this.router.navigate(['/task-detail', id, 'details']);
  }

  btnDeleteClick(taskKey) {
    let notifyConfig = this.notifySvc.notify('Are you sure?', 'Delete', {
      duration: 7000,
      extraClasses: ['snack-delete']
    });
    this.notifySvc.notifyAction(notifyConfig, () => this.deleteTask(taskKey));
  }

  openCreateTaskDialog() {
    let dialogRef = this.dialog.open(TaskCreateComponent);
  }

  showAllTasks() {
    this.tasks = this.getTask(null);
    this.allTasksVisible = !this.allTasksVisible;
  }

  showMyTasks() {
    this.allTasksVisible = !this.allTasksVisible;
    this.tasks = this.tasks.filter((task) => {
      return task.assignee == this.getCurrentLoggedUserData().email
    });
  }

  getCurrentLoggedUserData() {
    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
    return user
  }

  timeStampToDate(int) {
    int *= -1
    return new Date(int).toString();
  }

  addComment(comment, taskId) {
    let commentObj = {
      author: this.getCurrentLoggedUserData().uid,
      authorEmail: this.getCurrentLoggedUserData().email,
      createdOn: -1 * Number(new Date().getTime().toString()),
      comment: comment
    }

    this.commentSvc.addComment(commentObj, taskId)
  }
  goToUserDetail(email) {
    var id;
    this.users = this.userSvc.getUsers().subscribe((res) =>{
      this.users = res;
      this.users.forEach(element => {
        console.log(element)
        if (element.email == email){
          id = element.$key
        }
      });
      
      this.router.navigate(['/user-detail', id, 'details']);
    })
    
  }
}
