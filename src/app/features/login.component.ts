/**
 * Created by lmchuc on 8/1/2017.
 */
import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Angular2SocialLoginModule, AuthService} from "angular2-social-login";
import {LoginService} from "./login.service";
import {LoginSocial} from "./login.model";
import {User} from "../user/user.model";
import {Store} from "@ngrx/store";
import {UserActions} from "../user/user.actions";
import {AppState} from "../reducers";
import {ModalDirective} from "ngx-bootstrap";
import {socialProviders} from "../app.social";
import {APP_NAME} from "../services/constants";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ToastrService} from "ngx-toastr";
import {BasicValidators} from "../shared/basic-validators";

@Component({
  selector: 'log-in',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  @ViewChild('loginModal') loginModal: ModalDirective;
  @BlockUI() blockUI: NgBlockUI;
  loginForm: FormGroup;
  registerForm: FormGroup;
  sub: any;
  userCorner: boolean;
  register: boolean;
  userInfo: User;
  appName: string = APP_NAME;

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 50 characters long.',
    },
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 4 characters long.',
      'maxlength': 'Email cannot be more than 50 characters long.',
      'validateEmail': 'Your email is not corrected format.'
    },

    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 50 characters long.',
      'validatePassword': 'Password have to include number and alphabet'
    },

    'confirmPassword': {
      'required': 'Confirm password is required.',
      'minlength': 'Confirm password must be at least 6 characters long.',
      'maxlength': 'Confirm password cannot be more than 50 characters long.',
      'notEquivalent': 'Your confirm password is not same as your password',
      'validatePassword': 'Password is not right format'
    }
  };

  formEmpty = {
    'name': '',
    'email': '',
    'password': '',
    'confirmPassword': ''
  }
  formErrors = Object.assign({}, this.formEmpty);

  constructor(formBuilder: FormBuilder,
              public _auth: AuthService,
              public loginService: LoginService,
              private store: Store<AppState>,
              private userActions: UserActions,
              private toastrService: ToastrService) {

    this.loginForm = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        BasicValidators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        BasicValidators.password
      ]]
    });

    this.registerForm = formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        BasicValidators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        BasicValidators.password
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        BasicValidators.password
      ]]
    } , {
      validator: BasicValidators
        .matchPassword('password', 'confirmPassword') // your validation method
    });
    this.register = false;
    this.updateUserCorner();
  }

  showModal() {
    this.formErrors = Object.assign({}, this.formEmpty);
    Angular2SocialLoginModule.loadProvidersScripts(socialProviders);
    this.loginModal.show();
  }

  updateUserCorner(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('remember_login'))
      this.store.dispatch(this.userActions.checkLogin());
    this.store.select(state => state.user.user)
      .subscribe(user => {
        this.userInfo = user;
        this.userCorner = typeof this.userInfo.id !== 'undefined';
      });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChangedForm(data, this.registerForm));
    this.onValueChangedForm(this.registerForm); // (re)set validation messages now

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChangedForm(data, this.loginForm));
    this.onValueChangedForm(this.loginForm); // (re)set validation messages now
  }

  somethingWrong() {
    this.blockUI.stop();
    this.toastrService.warning('Something went wrong!');
  }

  getAvatar() {
    return this.userInfo.avatar != null ? this.userInfo.avatar : '/assets/images/default-avatar.png';
  }

  loginWith(provider) {
    this.blockUI.start();
    this.sub = this._auth.login(provider).subscribe(
      (loginSocial: LoginSocial) => {
        this.loginService.loginWithSocial(provider
          , {accessToken: provider === 'google' ? loginSocial.idToken : loginSocial.token})
          .subscribe(res => {
            this.saveInfoAction(res);
          }, error => this.somethingWrong());
      }, error => this.somethingWrong()
    );
  }

  loginLinkedin() {
    let IN: any;
    this.blockUI.start();
    this.loginService.loginWithLinkedIn().subscribe(
      (loginSocial: LoginSocial) => {
        this.loginService.loginWithSocial('linkedin'
          , {accessToken: loginSocial.token})
          .subscribe(res => {
            this.saveInfoAction(res);
          }, error => this.somethingWrong());
      }, error => this.somethingWrong()
    );
  }

  logOut() {
    this.store.dispatch(this.userActions.logout());
  }

  switchMode() {
    this.formErrors = Object.assign({}, this.formEmpty);
    this.register = !this.register;
  }

  signUp() {
    this.blockUI.start();
    this.loginService.signUp(this.registerForm.getRawValue()).subscribe(
     data => {
       this.loginService.loginWithSystem(data)
         .subscribe(res => {
           this.saveInfoAction(res);
         }, error => this.somethingWrong());
     }, error => this.somethingWrong());
  }

  signIn() {
    this.blockUI.start();
    this.loginService.loginWithSystem(this.loginForm.getRawValue()).subscribe(
      res => {
        this.saveInfoAction(res);
      }, error => this.somethingWrong()
    );
  }

  saveInfoAction(res) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('remember_login', '1');
    this.updateUserCorner();
    this.loginModal.hide();
    this.blockUI.stop();
    this.toastrService.success('You have successfully logged in.');
  }

  onValueChangedForm(data?: any, formApp?: FormGroup) {
    if (!formApp) {
      return;
    }
    let form = formApp;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}

