import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from './notify.service';


@Injectable()
export class AuthService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private notifySvc: NotifyService) {
    this.authState = this.afAuth.authState;
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? firebase.auth().currentUser : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData();
        this.router.navigate(['/']);
        window.location.reload();
      })
      .catch(error => {
        this.notifySvc.notify(error.toString(), null, {
          duration: 4000,
          extraClasses: ['snack-denied']
        });
        console.log(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, firstName: string = null, lastName: string = null) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        if (user.displayName == null) {
          this.authState.name = `${firstName} ${lastName}`;
        }
        this.updateUserData();
        this.router.navigate(['/']);
        window.location.reload();
      })
      .catch(error => {
        this.notifySvc.notify(error.toString(), null, {
          duration: 4000,
          extraClasses: ['snack-denied']
        });
        console.log(error);
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        // this.updateUserData();
        this.router.navigate(['/']);
        window.location.reload();
      })
      .catch(error => {
        this.notifySvc.notify(error.toString(), null, {
          duration: 4000,
          extraClasses: ['snack-denied']
        });
        console.log(error);
      });
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    window.location.reload();
  }

  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: this.authState.displayName == null ? this.authState.name : this.authState.displayName,
      registeredOn: new Date().getTime().toString()
    };

    this.db.object(path).update(data)
      .catch(error => {
        this.notifySvc.notify(error.toString(), null, {
          duration: 4000,
          extraClasses: ['snack-denied']
        });
        console.log(error);
      });

  }
}
