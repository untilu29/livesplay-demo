import {RequestBase} from "../../services/request-base";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {error} from "util";
import {API_BASE_URL} from "../../services/constants";
/**
 * Created by lmchuc on 7/3/2017.
 */
@Injectable()
export class SliderService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getSliders(): Observable<any> {
    return this.http.get('http://www.mocky.io/v2/595c6a881100007a000987cb')
      .map(res => this.shuffle(res.json()))
        .catch(this.handleErrorObservable);
  }

  getTopVideos(): Observable<any> {
    return this.http.get(`${API_BASE_URL}api/videos/top?n=10`)
      .map(res => this.shuffle(res.json()))
        .catch(this.handleErrorObservable);
  }

  shuffle(data: any) {
    let m = data.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = data[m];
      data[m] = data[i];
      data[i] = t;
    }
    return data;
  }
}
