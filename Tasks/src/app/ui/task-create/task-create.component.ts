import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import {  UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  userIsAuth = false;
  taskForm: FormGroup;
  users: any;

  constructor(private dialogRef: MdDialogRef<TaskCreateComponent>,
    private fb: FormBuilder,
    private taskSvc: TaskService,
  private userSvc: UserService) { }

  ngOnInit() {
    this.userIsAuth = this.isUserAuth();
    
    this.users = this.userSvc.getUsers();
    console.log(this.users)
    this.buildForm();
  }

  isUserAuth() {
    return Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0] != null;
  }

  buildForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignee: ['', ''],
      comments: ['', ''],
    });
  }

  onSubmit() {
    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const currentUser = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;

    this.taskForm.value.creatorId = currentUser.uid;
    //reverse number for order by desc
    this.taskForm.value.createdOn = -1 * Number(new Date().getTime().toString());
    this.taskSvc.addTask(this.taskForm.value);
    this.dialogRef.close();
  }
}
