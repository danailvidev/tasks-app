import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private userSvc: UserService,
    private router: Router) { }

  ngOnInit() {
    this.users = this.userSvc.getUsers();
  }

  goToUserDetail(id) {
      this.router.navigate(['/user-detail', id]);
  }
}


