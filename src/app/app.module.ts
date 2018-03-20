import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmailDashboardComponent } from './email-dashboard/email-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadEmailComponent } from './read-email/read-email.component';
import { RouterModule, Routes } from '@angular/router';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from './store/inbox.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmailEffects } from './effects/email.effects';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { TagsDropdownComponent } from './tags-dropdown/tags-dropdown.component';

const routes: Routes = [
  {
    path: 'inbox', component: EmailDashboardComponent,
    children: [
      {path: ':id', component: ReadEmailComponent},
      {path: '', component: EmailInboxComponent}
    ]
  },
  {path: '**', redirectTo: 'inbox', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EmailDashboardComponent,
    ReadEmailComponent,
    EmailInboxComponent,
    ComposeEmailComponent,
    TagsDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ emails: emailReducer }),
    EffectsModule.forRoot([EmailEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
