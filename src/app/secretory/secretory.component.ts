import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { PatientService } from '../services/index';

@Component({
    templateUrl: 'secretory.component.html',
    styleUrls: ['secretory.component.css']
})

export class SecretoryComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    constructor(private patientService: PatientService) { }

    ngOnInit() {
        this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
    }

    createpatient() {
        this.loading = true;
        this.patientService.createPatient(this.model.firstname,
            this.model.middlename,
            this.model.lastname,
            this.model.address,
            this.model.city,
            this.model.state,
            this.model.zip,
            this.model.gender,
            this.model.dateofbirth)
            .subscribe(result => {
                alert(result);
            });

        this.loading = false;
    }
}