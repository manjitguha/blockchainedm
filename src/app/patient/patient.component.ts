import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';
import { AppointmentService } from '../services/index';

@Component({
    templateUrl: 'patient.component.html'
})

export class PatientComponent implements OnInit {
	model: any = {};
    loading = false;
    error = '';
    
    constructor(private userService: UserService, private appointmentService: AppointmentService) { }

    ngOnInit() {
    	this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
    	this.getAppointments();
    }

    getAppointments(){
        let appointments = this
                .appointmentService
                .getAppointments()
                 .subscribe(result => {
                    if(result){
                         this.model.appointments = JSON.parse(result);
                    } 
                });
    }
    
    openAppointment(){
        let appointmentDetails = this
                .appointmentService
                .getAppointmentDetails(this.model.selectedAppointmentId, "SECRETARY")
                 .subscribe(result => {
                    if(result){
                         this.model.selectedAppointment = JSON.parse(result);
                    } 
                });
        console.log(this.model.selectedAppointment);
    }

}