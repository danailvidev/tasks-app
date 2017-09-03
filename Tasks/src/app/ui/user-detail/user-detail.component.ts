import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: any;
  showInput = false;
  name: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userSvc: UserService,
    private location: Location,
    private authSvc: AuthService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userSvc.getUserById(id).subscribe((res) => {
      this.user = res;
      // console.log(this.user);
    });
  }

  onBack() {
    this.location.back();
  }

  isAbleToEdit(id) {
    return this.authSvc.currentUserId !== id;
  }

  toggleShowInput() {
    this.showInput = !this.showInput;
  }
  saveUserData(id) {
     this.showInput = false;
     this.user.name = this.name;
     this.userSvc.updateUser(id, this.user);
  }

  onKey(ev) {
    this.name = ev.srcElement.value;
  }
}
