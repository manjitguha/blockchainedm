import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { PROVIDERS } from '../helpers/fake-providers';

import { AuthenticationService } from './authentication.service';
import { Provider } from '../models/index';

@Injectable()
export class ProviderService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
           // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getProviders(): Provider[] {
        if (this.authenticationService && this.authenticationService.token) {
            // get users from api
            return PROVIDERS;
        }
        else {
            return null;
        }
    }

    getProviderDetail(providerId: string): Provider {
        if (this.authenticationService && this.authenticationService.token) {
            for (let providers in PROVIDERS) {
                if(providerId === PROVIDERS[providers].providerId){
                    return PROVIDERS[providers]
                }
            }
        }
        else {
            return null;
        }
    }
}