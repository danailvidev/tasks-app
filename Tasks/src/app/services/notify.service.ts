import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

@Injectable()
export class NotifyService {

  constructor(public snackBar: MdSnackBar) { }

  notify(message: string, action: string, config: any) {
    return this.snackBar.open(message, action, { duration: config.duration, extraClasses: config.extraClasses });
  }

  notifyAction(notification: MdSnackBarRef<any>, next) {
    return notification.onAction().subscribe(() => {
      next();
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }

}