import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { CONSTANTS } from '../helpers/constants'

import { AuthenticationService } from './authentication.service';
import { Patient } from '../models/index';
import { GoogleMap } from '../models/index';

@Injectable()
export class GoogleMapsService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
           // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getBestGuessPath(origin:string,destination:string): Observable<GoogleMap> {
        if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
			let url = CONSTANTS.googleMapsURL
			+CONSTANTS.googleMapsURLAppendOrigin+origin
			+CONSTANTS.googleMapsURLAppendDestination+destination
			+CONSTANTS.googleMapsURLAppendDepartureTime+(new Date().getTime())
			+CONSTANTS.googleMapsURLAppendTrafficModel+CONSTANTS.googleMapsURLAppendKey;

			let sanitizedURL = 	url.replace(' ', '+');

            return this.http.get(sanitizedURL, options)
                .map((response: Response) => {
                    return response.json();
                });
        }
        else {
            return null;
        }
    }
}
