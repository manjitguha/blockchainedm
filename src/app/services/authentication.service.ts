import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map'
import { USERS } from '../helpers/fake-users';
import { User } from '../models/index';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string) {
        console.log('Logging in using ==> username-->'+username+', password-->'+password);
        var userExists = 1;
        var loggedInUser ;
                  
        for (let user in USERS) {
            // check user credentials and return fake jwt token if valid
            if (username === USERS[user].username && password === USERS[user].password) {
                userExists = 0;
                loggedInUser = USERS[user];
                break;
            } 
        }
        if (userExists == 0) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', 
                JSON.stringify({ username: username, token: 'fake-jwt-token', 
                    userDetails: loggedInUser }));

            // return true to indicate successful login
            return true;
        }
        else {
            return false;
        }
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }


    isLoggedIn(url: string): boolean {
        if (localStorage.getItem('currentUser')) {
            var currentUser = localStorage.getItem('currentUser');
            let homeUrl = JSON.parse(currentUser).userDetails.organization.homeURL;
            if (url != '/' && url != '/login' && url && homeUrl && !url.startsWith(homeUrl)) {
                this.logout();
                this.router.navigate(['/login']);
                return false;
            }
            // logged in so return true
            return true;
        }
    }
}