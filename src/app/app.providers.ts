import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import {LoginService} from "./features/login.service";

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  LoginService
];
