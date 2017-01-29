import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { Appointment } from '../models/index';

import { UserService , AppointmentService, PatientService, ProviderService } from '../services/index';


@Component({
    templateUrl: 'provider.component.html',
    styleUrls: ['provider.component.css']
})

export class ProviderComponent implements OnInit {
 	model: any = {};
    loading = false;
    error = '';

    constructor(private userService: UserService, 
        private appointmentService: AppointmentService, 
        private patientService: PatientService, 
        private providerService: ProviderService) { }

    ngOnInit() {
    	this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
    	this.getAppointments();
    }

    getAppointments(){
        this.loading = true;
  
        this.appointmentService
           .getAppointmentsForId(this.model.currentUser.parentId)
           .subscribe(result =>{
                    if(result && result.length>0){
                        this.model.appointments =[];
                        let appointmentMap = JSON.parse(result).uuidMap;
                        for (let key in appointmentMap) {
                          this.model.appointments.push(key);
                        }
                        if(this.model.appointments.length>0){
                            this.model.selectedAppointmentId = this.model.appointments[0];
                            this.openAppointment();
                        }
                    }
                    this.loading = false;
                },
                error=> { 
                    console.log("Error happened" + error);
                    this.loading = false;
                });
    }
    
    openAppointment(){
        let appointmentDetails = this
                .appointmentService
                .getAppointmentDetails(this.model.selectedAppointmentId, "PROVIDER")
                 .subscribe(result => {
                    if(result){
                         this.model.selectedAppointment = JSON.parse(result);
                         this
                            .providerService
                            .getProviderDetail(this.model.selectedAppointment.providerId)
                            .subscribe(providerResponse=>{
                                if(providerResponse 
                                    && providerResponse.length 
                                    && providerResponse.length>0 
                                    && providerResponse[0]._id){
                                    this.model.selectedAppointment.provider = providerResponse[0];
                                }
                            }, providerError=>{
                                console.log("Error");
                            });
                         this
                            .patientService
                            .getPatientDetail(this.model.selectedAppointment.patientId)
                            .subscribe(patientResponse=>{
                                if(patientResponse 
                                    && patientResponse.length 
                                    && patientResponse.length>0 
                                    && patientResponse[0]._id){
                                    this.model.selectedAppointment.patient = patientResponse[0];
                                }
                            }, providerError=>{
                                console.log("Error");
                            }) 
                    } 
                });
        console.log(this.model.selectedAppointment);
    }

    scheduleAppointment(){this.loading = true;
        this.loading = true;
        let appointment = this.model.selectedAppointment;
        this.appointmentService
            .scheduleAppointment(appointment)
            .subscribe(result => {
                this.model.appointmentScheduledMsg = result;
                console.log("Appointment Scheduled");
            });
        this.loading = false;
    }

}