import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = null;
  tasks;

  constructor(private auth: AuthService, private db: TasksService) {
    // this.tasks = db.list('tasks', {
    //   query: {
    //    orderByChild: "name",
    //    limitToLast: 10,
    //   }
    //   }).map((tasks) => {console.log(tasks);
    //   return tasks.reverse();})   
    // console.log(this.tasks);

    

    // this.db.list('/tasks', { preserveSnapshot: true})
    // .subscribe(snapshots=>{
    //     snapshots.forEach(snapshot => {
    //       console.log(snapshot.key, snapshot.val());
    //     });
    // })


  }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
      this.db.get().subscribe((res) => {
        this.tasks = res;
        console.log(this.tasks);
      });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}


