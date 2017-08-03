import {RequestBase} from "../../services/request-base";
import {Http} from "@angular/http";
import {API_BASE_URL} from "../../services/constants";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoryService extends RequestBase{
  constructor(http: Http) {
    super(http);
  }

  getAllVideos(page: number): Observable<any> {
    return this.http.get(`${API_BASE_URL}api/videos/` + (page - 1))
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }


}
