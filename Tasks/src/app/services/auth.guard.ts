import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {NotifyService} from './notify.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
     private router: Router,
    private notifySvc: NotifyService) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.afAuth.authState
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               this.notifySvc.notify("access denied",null,{
                duration: 2000,
                extraClasses: ['snack-denied']
              });
               this.router.navigate(['/login']);
             }
         })

  }
}