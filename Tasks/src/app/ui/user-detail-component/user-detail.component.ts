import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from "../../services/task.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-detail-component',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: any;
  operation: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userSvc: UserService) { }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    const id = this.route.snapshot.params['id'];
    this.userSvc.getUserById(id).subscribe((res) => {
      this.user = res
      console.log(this.user);
    })


  }

}
