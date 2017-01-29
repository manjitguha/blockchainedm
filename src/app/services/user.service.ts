import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from '../models/index';
import { CONSTANTS } from '../helpers/index';



@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    	   // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getUsers(): Observable<User[]> {
     if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(CONSTANTS.userAllDocsURL, options)
                .map((response: Response) => {
                    return response.json().body;
                });
        }
        else {
            return null;
        }

    }
}