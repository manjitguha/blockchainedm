import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { AuthenticationService } from './authentication.service';
import { Provider } from '../models/index';

@Injectable()
export class ProviderService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
    }

    getProviders(): Observable<Provider[]> {
        if (this.authenticationService && this.authenticationService.token) {
           // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.get('/api/providers', options)
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }

    getProviderDetail(providerId: string): Observable<Provider> {
        if (this.authenticationService && this.authenticationService.token) {
           // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.post('/api/providerDetail',{'providerId':providerId}, options)
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }
}