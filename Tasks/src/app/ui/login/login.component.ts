import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //@Output() user = new EventEmitter();

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }


  signInWithGithub(): void {
    this.auth.githubLogin()
    .then(() => this.afterSignIn());
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  /// Shared
  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    //this.user.emit(this.auth.currentUser);

    this.router.navigate(['/tasks']);
    window.location.reload();
  }

}
