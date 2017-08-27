import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.users = this.userSvc.getUsers();

  }
}


