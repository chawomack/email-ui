import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../store/appstate.model';
import { select, Store } from '@ngrx/store';
import { skipWhile, take } from 'rxjs/operators';
import { Emails } from '../store/inbox.state';
import { EmailActionTypes } from '../store/inbox.actions';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  emails: any[] = [];
  selectedEmails: any[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store
      .pipe(
        select('emails'),
        skipWhile((data: Emails) => data.inbox.length < 1),
        take(1)
      )
      .subscribe((data: any) => this.emails = data.inbox);
  }

  selectEmail(selected: boolean, email: any) {
    if (selected) {
      this.selectedEmails.push(email);
    } else {
      this.selectedEmails = this.selectedEmails.filter(em => em.id !== email.id);
    }
  }

  moveToTrash() {
    this.emails = this.emails.filter(email => !this.selectedEmails.find(trashItem => trashItem.id === email.id));
    this.store.dispatch({type: EmailActionTypes.MOVETOTRASH, payload: this.selectedEmails});
    this.store.dispatch({type: EmailActionTypes.LOAD_EMAILS_SUCCESS, payload: this.emails});

    this.selectedEmails = [];
  }

  addTag() {
  }
}
