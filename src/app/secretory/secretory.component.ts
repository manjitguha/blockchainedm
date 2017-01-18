import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { Appointment } from '../models/index';
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
        this.model.appointmentScheduledMsg = "";
        this.populateTopMessage();
        this.getPatients();
        this.getProviders();
        this.getAppointmentTimeList();
        this.getAppointmentDateList();
        this.getAppointments();
        this.appointmentService
                .fetchUUID()
                .subscribe(result => {
                    this.model.blockchainId = result;
                    console.log("Blockchain ID Created");
                });
    }

    areAllFieldsAvailable(){
        if(this.model.patientSelected 
            && this.model.providerSelected 
            && this.model.appointmentDate 
            && this.model.appointmentTime
            && this.model.blockchainId){
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
        let patients = this.patientService.getPatients();
        this.model.patients = patients;
    }

    scheduleAppointment(){
        this.loading = true;
        if(this.areAllFieldsAvailable()){
            let appointment = new Appointment();
            appointment.appointmentId = this.model.blockchainId;
            appointment.patient = this.model.selectedPatientDetail;
            appointment.provider = this.model.selectedProviderDetail;
            appointment.appointmentDate = this.model.appointmentDate ;
            appointment.appointmentTime = this.model.appointmentTime;
            appointment.status = "NEW";
            appointment.prescriptionNotes = "";
            appointment.diagnosisNotes = "";
            this.appointmentService
                .scheduleAppointment(appointment)
                .subscribe(result => {
                    this.model.appointmentScheduledMsg = result;
                    console.log("Appointment Scheduled");
                });
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
        let patient = this.patientService.getPatientDetail(patientId);
        this.model.patients = [];
        this.model.patients.push(patient);
        this.model.patientSelected = true;
        this.model.selectedPatientDetail = patient;
        this.populateTopMessage();
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
        let providers = this.providerService.getProviders();
        this.model.providers = providers;
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

    getProviderDetail(providerId: string){
        let provider = this.providerService.getProviderDetail(providerId);
        this.model.providers = [];
        this.model.providers.push(provider);
        this.model.providerSelected = true;
        this.model.selectedProviderDetail = provider;
        this.populateTopMessage();
    }
}