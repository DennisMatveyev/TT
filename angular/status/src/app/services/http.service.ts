import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService{

    constructor(private http: Http){}

    postLoginData(obj: {}) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('http://localhost:8000/api/login/', body, { headers: headers })
                        .map((resp:Response) => resp.json())
                        .catch((error:any) => {return Observable.throw(error);});
    }

    getUserData() {
      const token = localStorage.getItem('token');
      let headers = new Headers({'Authorization': `Token ${token}`});

      return this.http.get('http://localhost:8000/api/profile/', {headers: headers})
                      .map((resp:Response) => resp.json())
                      .catch((error:any) => {return Observable.throw(error);});
    }

    postUserStatus(data) {
      const token = localStorage.getItem('token');
      let headers = new Headers({'Authorization': `Token ${token}`});
      let params = new URLSearchParams();
      params.set('CurrentStatus', data['CurrentStatus']);
      params.set('UniqueID', data['UniqueID']);

      return this.http.get('http://localhost:8000/api/update_status/', {search: params, headers: headers})
                      .map((resp:Response) => resp.json())
                      .catch((error:any) => {return Observable.throw(error);});
    }

    getUsers(search?: {}) {
      const token = localStorage.getItem('token');
      let headers = new Headers({'Authorization': `Token ${token}`});

      return this.http.get('http://localhost:8000/api/user_list/', {search: search, headers: headers})
                      .map((resp:Response) => resp.json())
                      .catch((error:any) => {return Observable.throw(error);});
    }
}
