import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    this.user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
  }
  logOut() {
    this.auth.signOut();
  }
  editUser() {
    this.router.navigate(['/user-detail', this.user.uid]);
  }
}
