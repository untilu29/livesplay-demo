import {Inject, Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class RequestBase {
  headers = new Headers();
  noPreFlightHeaders = new Headers();
  headersAuth = new Headers();

  options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  optionsNoPre = new RequestOptions({
    headers: this.noPreFlightHeaders,
    withCredentials: true
  });

  optionsAuth = new RequestOptions({
    headers: this.headersAuth,
    // withCredentials: true
  });

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
    this.headersAuth.append('Content-Type', 'application/json');
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        this.setAuthOption();
    }
  }
  protected setAuthOption(): RequestOptions {
    this.optionsAuth.headers.set('x-auth-token', localStorage.getItem('token'));
    return this.optionsAuth;
  }

  protected handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  protected handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
