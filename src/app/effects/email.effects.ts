import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { EmailActionTypes } from '../store/inbox.actions';

@Injectable()
export class EmailEffects {
  constructor(private http: HttpClient,
              private actions$: Actions) {
  }

  @Effect() getEmails$: Observable<Action> = this.actions$.pipe(
    ofType(EmailActionTypes.GETEMAILS),
    mergeMap(action =>
    this.http.get('/assets/emails.json')
      .pipe(
        map((data: {messages: any[]}) => ({ type: EmailActionTypes.LOAD_EMAILS_SUCCESS, payload: data.messages })),
        catchError(() => of({ type: EmailActionTypes.LOAD_EMAILS_FAILED }))
      )
    )
  );

  // @Effect({ dispatch: true }) init$: Observable<any> = defer(() => of(null)).pipe(
  //   mergeMap(action =>
  //     this.http.get('/assets/emails.json')
  //       .pipe(
  //         map((data: {messages: any[]}) => ({ type: 'LOAD_EMAILS_SUCCESS', payload: data.messages })),
  //         catchError(() => of({ type: 'LOAD_EMAILS_FAILED' }))
  //       )
  //   )
  // );

}
