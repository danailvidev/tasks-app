import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { NotifyService } from '../services/notify.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Task } from '../view-models/task';
import { RequirementsComponent } from '../requirements/requirements.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  user = null;
  tasks: any;
  showSpinner: boolean = false;
  selectedValue: string;
  currentUser: any;

  constructor(private auth: AuthService,
    private taskSvc: TaskService,
    public notify: NotifyService) {
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.getTask(this.pageSize);
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
      console.log(res);
    });
  }

  deleteTask(key) {
    this.taskSvc.deleteTask(key);
  }

  btnDeleteClick(taskKey) {
    let notifyConfig = this.notify.notify('Are you sure?', 'Delete', {
      duration: 7000,
      extraClasses: ['snack-delete']
    });
    this.notify.notifyAction(notifyConfig, () => this.deleteTask(taskKey));
  }
}
