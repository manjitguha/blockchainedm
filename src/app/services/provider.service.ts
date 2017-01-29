import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { CONSTANTS } from '../helpers/constants';


import { AuthenticationService } from './authentication.service';
import { Provider,Request,Selector ,Condition} from '../models/index';

@Injectable()
export class ProviderService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
           // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getProviders(): Observable<Provider[]> {
        if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(CONSTANTS.providerAllDocsURL, options)
                .map((response: Response) => {
                    return response.json().body;
                });
        }
        else {
            return null;
        }
    }

    getProviderDetail(providerId: string): Observable<Provider[]> {
       if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let request: Request = new Request();
            request.selector = new Selector();
            request.selector._id = new Condition();
            request.selector._id.$eq = providerId;
            request.fields=[];
            return this.http.post(CONSTANTS.searchProviderURL,JSON.stringify(request), options)
                .map((response: Response) => {
                    return response.json().body;
                });
        }
        else {
            return null;
        }
    }
}