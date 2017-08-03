/**
 * Created by lmchuc on 8/1/2017.
 */

import {Injectable} from "@angular/core";
import {RequestBase} from "../../services/request-base";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {API_BASE_URL} from "../../services/constants";
@Injectable()
export class DetailService extends RequestBase {
  constructor(http: Http){
    super(http);
  }

  getVideoDetail(slug: string): Observable<any> {
    if (typeof slug === 'undefined') slug = '';
    return this.http.get(`${API_BASE_URL}api/videos/detail?slug=${slug}`)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }
}
