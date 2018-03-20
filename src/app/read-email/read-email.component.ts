import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/appstate.model';
import { Emails } from '../store/inbox.state';
import { EmailActionTypes } from '../store/inbox.actions';

@Component({
  selector: 'app-read-email',
  templateUrl: './read-email.component.html',
  styleUrls: ['./read-email.component.scss']
})
export class ReadEmailComponent implements OnInit {
  email: any;
  emails: any[] = [];
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store
      .pipe(
        select('emails'),
        skipWhile((data: Emails) => data.inbox.length < 1),
        take(1),
        tap(data => this.emails = data.inbox),
        switchMap(() => this.activeRoute.params)
      ).subscribe(params => {
        this.email = this.emails.find(em => em.id === params.id);
      });
  }

  moveToTrash() {
    this.emails = this.emails.filter(em => em.id !== this.email.id);
    this.store.dispatch({type: EmailActionTypes.MOVETOTRASH, payload: this.email});
    this.store.dispatch({type: EmailActionTypes.LOAD_EMAILS_SUCCESS, payload: this.emails});

    this.router.navigate(['/inbox']);
  }
}
