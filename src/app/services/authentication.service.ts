﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        console.log('Logging in using ==> username-->'+username+', password-->'+password);
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, userDetails: response.json().loggedIdUser }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
      }

 private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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