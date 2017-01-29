import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../models/index';
import { Request } from '../models/index';
import { Condition } from '../models/index';
import { Selector } from '../models/index';
import { CONSTANTS } from '../helpers/constants';


@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string) : Observable<boolean>{
        console.log('Logging in using ==> username-->'+username+', password-->'+password);
        var userExists = 1;
        var loggedInUser ;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        let request: Request = new Request();
        request.selector = new Selector();
        request.selector.username = new Condition();
        request.selector.password = new Condition();
        request.selector.username.$eq = username;
        request.selector.password.$eq = password;

        console.log(JSON.stringify(request));

        return this.http.post(CONSTANTS.authenticationURL,JSON.stringify(request), options)
                .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let users = response.json() && response.json().body;
                

                if (users && users.length > 0) {
                    // set token property
                    this.token = 'fake-jwt-token';

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', 
                        JSON.stringify({ username: username, token:'fake-jwt-token' ,userDetails:users[0] }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
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