import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { PatientService } from '../services/index';
import { ProviderService } from '../services/index';
import { AppointmentService } from '../services/index';


@Component({
    templateUrl: 'secretory.component.html',
    styleUrls: ['secretory.component.css']
})

export class SecretoryComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    constructor(private patientService: PatientService, private providerService: ProviderService, private appointmentService : AppointmentService) { }

    ngOnInit() {
        this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
        this.model.patientSelected = false;
        this.model.providerSelected = false;
        this.model.appointmentDate = new Date().toDateString();
        this.model.appointmentTime = "8:00 - 9:00";
        this.model.appointmentTimeList = [];
        this.model.appointmentDateList = [];
        this.model.blockchainId = "";
        this.populateTopMessage();
        this.getPatients();
        this.getProviders();
        this.getAppointmentTimeList();
        this.getAppointmentDateList();
        /*this.appointmentService
                .fetchUUID()
                .subscribe(result => {
                    alert(result);
                    alert("Blockchain Create");
                });*/
    }

    areAllFieldsAvailable(){
        if(this.model.patientSelected 
            && this.model.providerSelected 
            && this.model.appointmentDate 
            && this.model.appointmentTime){
            return true;
        }
        else{
            return false;
        }
    }

    getAppointmentTimeList(){
        let startTime = 8;
        let endTime = 9;
        for(let loopCounter =0;loopCounter<8;loopCounter++){
            this.model.appointmentTimeList.push(startTime+":00 - "+endTime+":00");
            startTime++;
            endTime++;
        }
    }

    getAppointmentDateList(){
        let currentDate = new Date();
        for(let loopCounter =0;loopCounter<30;loopCounter++){
            this.model.appointmentDateList.push(currentDate.toDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    getPatients(){
        this.patientService.getPatients()
            .subscribe(result => this.model.patients = result);
    }

    scheduleAppointment(){
        this.loading = true;
        if(this.areAllFieldsAvailable()){
            
        }
        if(this.model.selectedPatientId){
            this.getPatientDetail(this.model.selectedPatientId);
        }
        if(this.model.selectedProviderId){
            this.getProviderDetail(this.model.selectedProviderId);
        }

        this.loading = false;
    }

    getPatientDetail(patientId: string){
        this.patientService.getPatientDetail(patientId)
            .subscribe(result => {
                this.model.patients = [];
                this.model.patients.push(result);
                this.model.patientSelected = true;
                this.model.selectedPatientDetail = result;
                this.populateTopMessage();
            });
    }

    populateTopMessage(){
         if(this.model.patientSelected && this.model.providerSelected){
            this.model.topMessage = "Scheduling Appointment for ";
            this.model.topMessage += this.model.selectedPatientDetail.firstname;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedPatientDetail.lastname;
            this.model.topMessage += " with Dr. " ;
            this.model.topMessage += this.model.selectedProviderDetail.firstname;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedProviderDetail.lastname;
        } else if(this.model.patientSelected){
            this.model.topMessage = "Scheduling Appointment for ";
            this.model.topMessage += this.model.selectedPatientDetail.firstname;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedPatientDetail.lastname;
        } else if(this.model.providerSelected){
            this.model.topMessage = "Scheduling Appointment with ";
            this.model.topMessage += this.model.selectedProviderDetail.firstname;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedProviderDetail.lastname;
        } else{
            this.model.topMessage = "Schedule Appointment";
        }
        if(this.model.appointmentDate){
            this.model.topMessage += " On "+this.model.appointmentDate;
        }
        if(this.model.appointmentTime){
            this.model.topMessage += " At " + this.model.appointmentTime;
        }
    }

    getProviders(){
        this.providerService.getProviders()
            .subscribe(result => this.model.providers = result);
    }

    getProviderDetail(providerId: string){
        this.providerService.getProviderDetail(providerId)
            .subscribe(result => {
                this.model.providers = [];
                this.model.providers.push(result);
                this.model.providerSelected = true;
                this.model.selectedProviderDetail = result;
                this.populateTopMessage();
            });
    }
}