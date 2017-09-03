import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  users: any;
  operation: string;
  selectedEmail;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskSvc: TaskService,
    private userSvc: UserService,
    private notifySvc: NotifyService) {

  }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    const id = this.route.snapshot.params['id'];
    this.taskSvc.getTaskById(id).subscribe((res) => {
      this.task = res;
      this.selectedEmail = this.task.assignee;

      // console.log(this.task);
    });

    this.users = this.userSvc.getUsers();
  }

  save(title, description, assignee) {
    this.task.title = title;
    this.task.description = description;
    this.task.assignee = assignee;
    console.log(this.task);
    this.taskSvc.updateTask(this.task.$key, this.task);
    this.notifySvc.notify('Task Updated', null, {
      duration: 3000,
      extraClasses: ['snack-success']
    });
  }

}
