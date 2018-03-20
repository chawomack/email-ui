import { Action } from '@ngrx/store';

export enum EmailActionTypes {
  MOVETOTRASH = '[Inbox] MoveToTrash',
  GETEMAILS = '[Inbox] GetEmails',
  LOAD_EMAILS_SUCCESS = '[Inbox] LoadEmailsSuccess',
  LOAD_EMAILS_FAILED = '[Inbox] LoadEmailsFailed',
}

export class MoveToTrash implements Action {
  readonly type = EmailActionTypes.MOVETOTRASH;
  constructor(public payload: any) {}
}

export class GetEmails implements Action {
  readonly type = EmailActionTypes.GETEMAILS;
}

export class LoadEmailsFailed implements Action {
  readonly type = EmailActionTypes.LOAD_EMAILS_FAILED;
}

export class LoadEmailsSuccess implements Action {
  readonly type = EmailActionTypes.LOAD_EMAILS_SUCCESS;
  constructor(public payload: any) {}
}

export type EmailActions
  = MoveToTrash
  | GetEmails
  | LoadEmailsSuccess
  | LoadEmailsFailed;
