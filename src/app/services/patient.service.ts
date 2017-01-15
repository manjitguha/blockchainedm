import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { AuthenticationService } from './authentication.service';
import { Patient } from '../models/index';

@Injectable()
export class PatientService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
    }

    getPatients(): Observable<Patient[]> {
        if (this.authenticationService && this.authenticationService.token) {
           // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.get('/api/patients', options)
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }

    getPatientDetail(patientId: string): Observable<Patient> {
        if (this.authenticationService && this.authenticationService.token) {
           // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let params = new URLSearchParams();
            params.set('patientId', patientId);

            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.post('/api/patientDetail',{'patientId':patientId}, options)
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }
}