import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Task } from "../../view-models/task";
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  operation: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskSvc: TaskService) { }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    //empty if create
    if (this.operation === 'create') {
      this.task = { name: "", date: "" };
    }
    else {
      //TODO: get task by id 
      // this.taskSvc.getTaskById(this.route.snapshot.params['id']).subscribe((res) => {
      //   this.task = res;
      // });
      const id = this.route.snapshot.params['id'];
      this.task = this.taskSvc.getTaskById(id);
      console.log("show detail for",this.task);
    }
  }

  createTask(task: Task) {
    console.log("task" ,task)
  }

}
