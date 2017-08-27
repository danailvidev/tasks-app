import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  constructor() {
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

  
}


