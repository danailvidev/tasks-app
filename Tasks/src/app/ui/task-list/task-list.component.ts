import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NotifyService } from '../../services/notify.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Task } from '../../view-models/task';
import { Router } from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any;
  showSpinner: boolean = false;
  selectedValue: string;
  currentUser: any;

  constructor(private taskSvc: TaskService,
              public notify: NotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.taskSvc.getTask(null).subscribe((res) => {
      this.length = res.length;
      this.tasks = res;
    });
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

  deleteTask(key) {
    this.taskSvc.deleteTask(key);
  }

  createTask(){
    this.router.navigate(['/task-detail', 0, 'create']);
  }
  showTaskDetail (id: string) {
    this.router.navigate(['/task-detail', id, 'details']);
  }

  btnDeleteClick(taskKey) {
    let notifyConfig = this.notify.notify('Are you sure?', 'Delete', {
      duration: 7000,
      extraClasses: ['snack-delete']
    });
    this.notify.notifyAction(notifyConfig, () => this.deleteTask(taskKey));
  }
}
