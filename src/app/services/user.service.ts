import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { GLOBAL_USER } from './global';

@Injectable()

export class UserService{
    url: string;
    identity;
    token;
    stats;


    constructor(public _http: HttpClient){
        this.url = GLOBAL_USER.url;
    }

    signup(user, gettoken = null): Observable<any>{
        
        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = user;

        return this._http.post(this.url+'auth', params)
    }


    getToken(){
        let token = localStorage.getItem('token');

        if(token != null){
            this.token = token;
            this.token = JSON.parse(this.token)
            this.token = this.token.Authorization
        }else{
            this.token = null;
        }
        return this.token;
    }

    getProfile(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
            return this._http.get(this.url+'myprofile', { headers:headers })

    }
}