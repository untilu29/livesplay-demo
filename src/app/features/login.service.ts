/**
 * Created by lmchuc on 8/1/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {RequestBase} from "../services/request-base";
import {API_BASE_URL} from "../services/constants";
import {Observer} from "rxjs/Observer";
declare var IN: any;

@Injectable()
export class LoginService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }


  loginWithSocial(provider, data): Observable<any> {
    return this.http.post(`${API_BASE_URL}api/auth/` + provider, data)
      .map(res => res.json()).catch(this.handleErrorObservable);
  }
  loginWithSystem(user): Observable<any> {
    return this.http.post(`${API_BASE_URL}api/auth/`, user)
      .map(res => res.json()).catch(this.handleErrorObservable);
  }
  signUp(data): Observable<any> {
    return this.http.post(`${API_BASE_URL}api/users`, data)
      .map(res => res.json()).catch(this.handleErrorObservable);
  }

  loginWithLinkedIn(): Observable<Object> {
    return Observable.create(
      (observer: Observer<Object>) => {
            IN.User.authorize(function(){
              IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)')
                .result(function(res: any){
                let userDetails = {name: res.firstName + ' ' + res.lastName,
                  email: res.emailAddress, uid: res.id, provider: 'linkedIN',
                  image: res.pictureUrl, token: IN.ENV.auth.oauth_token};
                localStorage.setItem('_login_provider', 'linkedin');
                observer.next(userDetails);
                observer.complete();
              });
            });
      });
  }
}
