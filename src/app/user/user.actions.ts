/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { User } from './user.model';

@Injectable()
export class UserActions {

  static EDIT_USER = '[User] Edit User';
  editUser(user: User): Action {
    return {
      type: UserActions.EDIT_USER,
      payload: user
    };
  }

  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

  static LOGOUT_FAIL = '[User] Logout Fail';
  logoutFail(err: Error): Action {
    return {
      type: UserActions.LOGOUT_FAIL,
      payload: err
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success';
  logoutSuccess(res: Response): Action {
    return {
      type: UserActions.LOGOUT_SUCCESS,
      payload: res
    };
  }

  static CHECK_LOGIN = '[User] check login';
  checkLogin(): Action {
    return {
      type: UserActions.CHECK_LOGIN,
    };
  }

  static SAVE_INFO = '[User] Check Login ok and save';
  saveInfo(user: User): Action {
    return {
      type: UserActions.SAVE_INFO,
      payload: user
    };
  }

  static CHECK_LOGIN_FAIL = '[User] check login fail';
  checkLoginFail(err: Error): Action {
    return {
      type: UserActions.CHECK_LOGIN_FAIL,
      payload: err
    };
  }
}
