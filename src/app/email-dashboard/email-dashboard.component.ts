import { Component, OnInit } from '@angular/core';
import { colors } from '../models/colors.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/appstate.model';
import { EmailActionTypes } from '../store/inbox.actions';

@Component({
  selector: 'app-email-dashboard',
  templateUrl: './email-dashboard.component.html',
  styleUrls: ['./email-dashboard.component.scss']
})
export class EmailDashboardComponent implements OnInit {
  showCompose: boolean;
  inbox: any[] = [];
  selectedEmails: any[] = [];
  trash: any[] = [];
  tags: any[] = [];
  tagsMap = new Map();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch({type: EmailActionTypes.GETEMAILS});

    this.store.pipe(select('emails')).subscribe((data: any) => {
      this.inbox = data.inbox;
      this.trash = data.trash;
      this.setUniqueTags();
    });
  }

  setUniqueTags() {
    const allTags = this.inbox.reduce((prev, curr) => prev.concat(curr.tags), []);
    this.tags = Array.from(new Set(allTags));
  }

  moveToTrash() {
    this.trash.push(...this.selectedEmails);
    this.selectedEmails = [];
    this.inbox = this.inbox.filter(email => !this.trash.find(trashItem => trashItem.id === email.id));
  }

  addTag() {

  }

  composeEmail() {
    this.showCompose = !this.showCompose;
  }

}
