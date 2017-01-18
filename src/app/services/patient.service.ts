import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { PATIENTS } from '../helpers/fake-patients';

import { AuthenticationService } from './authentication.service';
import { Patient } from '../models/index';

@Injectable()
export class PatientService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
           // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getPatients(): Patient[] {
        if (this.authenticationService && this.authenticationService.token) {
            // get users from api
            return PATIENTS;
        }
        else {
            return null;
        }
    }

    getPatientDetail(patientId: string): Patient {
        if (this.authenticationService && this.authenticationService.token) {
            for (let patient in PATIENTS) {
                if(patientId === PATIENTS[patient].patientId){    
                    return PATIENTS[patient];
                }
            }
        }
        else {
            return null;
        }
    }
}