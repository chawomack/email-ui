import { Emails, emailState } from './inbox.state';
import { EmailActions, EmailActionTypes } from './inbox.actions';

export const GETEMAILS = 'GETEMAILS';

export function emailReducer(state: Emails = emailState, action: EmailActions) {
  switch (action.type) {

    case EmailActionTypes.GETEMAILS:
      console.log(action.type);
      return {...state, loading: true};

    case EmailActionTypes.LOAD_EMAILS_SUCCESS:
      console.log(action.payload);
      return {...state, inbox: action.payload, loading: false, error: false};

    case EmailActionTypes.LOAD_EMAILS_FAILED:
      console.log(action);
      return {...state, loading: false, error: true};

    case EmailActionTypes.MOVETOTRASH:
      return {...state, trash: state.trash.concat(action.payload)};

    default:
      return state;
  }
}
