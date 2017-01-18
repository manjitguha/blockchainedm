import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from '../models/index';
import { USERS } from '../helpers/fake-users'
@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    	   // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getUsers(): User[] {
        // get users from api
        return USERS;
    }
}