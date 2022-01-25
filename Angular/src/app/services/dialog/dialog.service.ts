import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open<T>(component: ComponentType<T>, config: MatDialogConfig): Observable<any> {
    return new Observable(observer => {
      this.dialog.open<T>(component, config)
        .afterClosed()
        .subscribe(retval => {
          if (retval) {
            observer.next(retval);
          }
          observer.complete();
        })
    })
  }
}
