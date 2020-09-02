import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { GLOBAL_GAME } from './global'; 
import { UserService } from './user.service'

@Injectable()

export class FigureService {
    url: string;
    token;

    constructor(
        public _http: HttpClient,
        private _userService: UserService,
    ) {
        this.url = GLOBAL_GAME.url;
        this.token = this._userService.getToken();
    }

    createFigure(figure): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
       
        let params = figure;

        return this._http.post(this.url+'figure', params, { headers: headers })
    }

    editFigure(figure, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
       
        let params = figure;        
        
        return this._http.put(this.url+'figure/' + id, params, { headers: headers })
    }

    getFigures(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
        return this._http.get(this.url + 'figure', { headers: headers })

    }

    getGroups(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
        return this._http.get(this.url + 'groupfigure', { headers: headers })

    }

    getFigureById(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
        return this._http.get(this.url + 'figure/' + id, { headers: headers })
    }
}