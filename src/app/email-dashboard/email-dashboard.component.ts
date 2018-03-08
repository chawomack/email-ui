import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { colors } from '../models/colors.model';

@Component({
  selector: 'app-email-dashboard',
  templateUrl: './email-dashboard.component.html',
  styleUrls: ['./email-dashboard.component.scss']
})
export class EmailDashboardComponent implements OnInit {
  emails: any[] = [];
  selectedEmails: any[] = [];
  trash: any[] = [];
  tags: any[] = [];
  tagsMap = new Map();
  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.emailService.getEmails()
      .subscribe(emails => {
        this.emails = emails;
        this.setUniqueTags();
        this.setTagColors();
      });
  }

  setUniqueTags() {
    const allTags = this.emails.reduce((prev, curr) => prev.concat(curr.tags), []);
    this.tags = Array.from(new Set(allTags));
  }

  setTagColors() {
    this.tags.forEach((tag, i) => {
      this.tagsMap.set(tag, colors[i]);
    });
  }

  getTagColor(tagName: string) {
    return this.tagsMap.get(tagName);
  }

  moveToTrash() {
    this.trash.push(...this.selectedEmails);
    this.selectedEmails = [];
    this.emails = this.emails.filter(email => !this.trash.find(trashItem => trashItem.id === email.id));
  }

  addTag() {

  }

  selectEmail(selected: boolean, email: any) {
    if (selected) {
      this.selectedEmails.push(email);
    } else {
      this.selectedEmails = this.selectedEmails.filter(em => em.id !== email.id);
    }
  }

}
